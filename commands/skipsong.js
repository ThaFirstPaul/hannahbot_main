// ./commands/command.js
// ========

const ytdl = require("ytdl-core");
const {
    AudioPlayerStatus,
    StreamType,
    NoSubscriberBehavior,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
} = require('@discordjs/voice');

var parent = require.main.exports;

parent.vars.songqueue = new Map();

module.exports = {
    name: "hhb play",
    version_added: "2.0",
    commands_regex: "songs?[\s]*play|play[\s]*songs?|play|skip",
    usage: "play {song}",
    supported_platforms: ["twitch", "discord"],
    invocation: async (platform, channel, tags, message) => {

        const command_args = message.replace(/[\s]*(songs?[\s]*play|play[\s]*songs?|play)[\s]+/, " playsong ").split(/[\s]+/);
        const song = command_args.slice(2).join(" ")

        switch (platform) {
            case "twitch":
                //if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.admin", true)) { return; }
                if (command_args[2] === "spotify") {
                    parent.functions.twitch_clientsay(channel, `[PLAY] This command is in development! `)
                    return
                }

                parent.functions.twitch_clientsay(channel, `[PLAY] Now playing "${song}"!`)
                return

            case "discord":
                //  platform      channel       tags,       message
                // "discord", message.channel, message, message.content

                if (command_args[2] === "spotify") {
                    parent.functions.discord_clientsay(tags, `[PLAY] This command is in development! `, true)
                    return
                }

                const voiceChannel = tags.member.voice.channel;
                if (!voiceChannel) {
                    parent.functions.discord_clientsay(tags, "You need to be in a voice channel to play music!", true);
                    return
                }

                const permissions = voiceChannel.permissionsFor(tags.client.user);
                if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
                    parent.functions.discord_clientsay(tags, "I need the permissions to join and speak in your voice channel!", true);
                    return
                }

                const serverQueue = parent.vars.songqueue.get(tags.guild.id);

                discord_add_to_queue(serverQueue, song, tags, (mes) => {
                    parent.functions.discord_clientsay(tags, mes, true);
                });
                return

            case "telegram":

                return

            case "web":

                return

            default:
                break;
        }



    }
}

async function discord_add_to_queue(serverQueue, song, message, return_message) {

    const voiceChannel = message.member.voice.channel;
    var songInfo;
    var isYouTubeVideoURL = false


    if (song.match(/^(http(s)?:\/\/)?(m.)?((w){3}.)?(music.)?youtu(be|.be)?(\.com)?\/.+/)) isYouTubeVideoURL = true
    var isYouTubePlaylistURL = song => song.match(/^https?:\/\/(music.)?(www.youtube.com|youtube.com)\/playlist(.*)$/);
    var isSpotifyURL = song => song.match(/^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/);

    if (!isYouTubeVideoURL) {
        return_message("Only youtube url's are supported as of now!")
        console.log("prompt not youtube url")
        return
    } else {
        if (ytdl.validateURL(song)) {
            songInfo = await ytdl.getInfo(song);
            console.log("prompt is a youtube url")
        } else {
            console.log("could not validate youtube url")
            return_message(`Sorry, I could not validate that url.`)
            return
        }
    }



    var song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };

    if (!serverQueue) {
        console.log("no server queue yet")
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: message.member.voice.channel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };

        parent.vars.songqueue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
            //var connection = await voiceChannel.join();
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0], connection);
        } catch (err) {
            console.log(err);
            parent.vars.songqueue.delete(message.guild.id);
            return message.channel.send(err);
        }
    } else {
        console.log("server queue already found")

        serverQueue.songs.push(song);
        return_message(`${song.title} has been added to the queue!`);
        return
    }
}

function play(guild, song, connection) {
    const serverQueue = parent.vars.songqueue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        parent.vars.songqueue.delete(guild.id);
        return;
    }

    const player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
        },
    });


    function play_next(player, serverQueue) {
        parent.debug ? console.log(`{DISCORD} Playing next song in list:`) : ""
        parent.debug ? console.log(serverQueue) : ""

        if (serverQueue.songs.length < 2) {
            serverQueue.textChannel.send(`Done Playing!`);
            return false;
        }

        serverQueue.songs.shift();
        song = serverQueue.songs[0]

        stream = ytdl(song.url, { filter: 'audioonly' });
        resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

        player.play(resource);
        return true;
    }

    var stream = ytdl(song.url, { filter: 'audioonly' });
    var resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

    player.play(resource);
    connection.subscribe(player);


    player.on(AudioPlayerStatus.Playing, () => {
        serverQueue.textChannel.send(`Now playing: **${song.title}**`);
    });

    player.on(AudioPlayerStatus.Idle, () => {
        if (serverQueue.songs.length <= 1) {
            player.delete();
        } else {
            play_next(player, serverQueue);
        }
    });

    player.on('error', error => {
        try {
            console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
        } catch (error) {
            console.error(`Error: ${error.message} with resource ${error.resource}`);
        }
        if (serverQueue.songs.length <= 1) {
            //TODO player.delete();
        } else {
            play_next(player, serverQueue);
        }
    });
}

function skip(player, serverQueue) {
    parent.debug ? console.log(`{DISCORD} Skipping this song and playing next song in list:`) : ""
    parent.debug ? console.log(serverQueue) : ""

    if (serverQueue.songs.length < 2) {
        serverQueue.textChannel.send(`Done Playing!`);
        return false;
    }

    serverQueue.songs.shift();
    song = serverQueue.songs[0]

    stream = ytdl(song.url, { filter: 'audioonly' });
    resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

    player.play(resource);
    return true;
}

function pause(player, serverQueue) {

    const player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
        },
    });


    function play_next(player, serverQueue) {
        parent.debug ? console.log(`{DISCORD} Playing next song in list:`) : ""
        parent.debug ? console.log(serverQueue) : ""

        if (serverQueue.songs.length < 2) {
            serverQueue.textChannel.send(`Done Playing!`);
            return false;
        }

        serverQueue.songs.shift();
        song = serverQueue.songs[0]

        stream = ytdl(song.url, { filter: 'audioonly' });
        resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

        player.play(resource);
        return true;
    }

    var stream = ytdl(song.url, { filter: 'audioonly' });
    var resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

    player.play(resource);
    connection.subscribe(player);


    player.on(AudioPlayerStatus.Playing, () => {
        serverQueue.textChannel.send(`Now playing: **${song.title}**`);
    });

    player.on(AudioPlayerStatus.Idle, () => {
        if (serverQueue.songs.length <= 1) {
            player.delete();
        } else {
            play_next(player, serverQueue);
        }
    });

    player.on('error', error => {
        try {
            console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
        } catch (error) {
            console.error(`Error: ${error.message} with resource ${error.resource}`);
        }
        if (serverQueue.songs.length <= 1) {
            player.delete();
        } else {
            play_next(player, serverQueue);
        }
    });
}

function remove_player(guild, song, connection) {

}