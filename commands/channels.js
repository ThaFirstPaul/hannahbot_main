// ./commands/channels.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb channels",
    version_added: "2.0",
    commands_regex: "channels?",
    supported_platforms: ["twitch"],
    invocation: async (platform, channel, tags, message) => {

        switch (platform) {
            case "twitch":
                const command_args = message.split(/[\s]+/);

                if (command_args.length < 3) {
                    if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.channels.list", true)) { return; }
                    parent.functions.twitch_clientsay(channel, `[CHN] I'm currently in ${String(parent.handlers.twitch_handler.get_client().getChannels()).split(",").length} channels. `)
                    return;
                }

                if ((/^join$/).test(command_args[2])) {
                    if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.channels.join", true)) { return; }
                    if (command_args.length < 4) {
                        parent.functions.twitch_clientsay(channel, `[CHN] Please supply a channel name, @${tags.username}!`);
                        return;
                    } else {
                        if (parent.hannahbot_storage.channels.includes(command_args[3].trim())) {
                            parent.functions.twitch_clientsay(channel, `[CHN] I'm already in this channel, @${tags.username} `);
                            return;
                        }
                        parent.handlers.twitch_handler.get_client().join(command_args[3].trim()).then((data) => {
                            parent.hannahbot_storage.channels.push(command_args[3].trim());
                            parent.functions.save_hannahbot_storage();

                            parent.functions.send_admin_telegram("[JOIN]", `Joined channel: ${command_args[3]} - by ${tags.username}`);
                            parent.functions.twitch_clientsay(channel, `[CHN] I have joined ${command_args[3]}'s channel, @${tags.username} `);
                            return;
                        }).catch((err) => {
                            parent.functions.send_admin_telegram("[ERROR]", `Failed to join channel: ${channel_} with error: ${err} - by ${tags.username}`);
                            console.log(err);
                            parent.functions.twitch_clientsay(channel, `[CHN] I could not join ${command_args[3]}'s channel, @${tags.username}. Please try again later. `);
                            return;
                        });


                    }
                    return
                }

                if ((/^(leave|part|remove|delete|clear)$/).test(command_args[2])) {
                    if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.channels.leave", true)) { return; }
                    if (command_args.length < 4) {
                        parent.functions.twitch_clientsay(channel, `[CHN] Please supply a channel name, @${tags.username}!`);
                        return;
                    } else {
                        if (!parent.hannahbot_storage.channels.includes(command_args[3].trim())) {
                            parent.functions.twitch_clientsay(channel, `[CHN] I'm not in this channel, @${tags.username} `);
                            return;
                        }
                        parent.handlers.twitch_handler.get_client().part(command_args[3].trim()).then((data) => {
                            // removes this channel from hannahbot data
                            for (let index = 0; index < parent.hannahbot_storage.channels.length; index++) {
                                const current_channel = parent.hannahbot_storage.channels[index];

                                if (current_channel === command_args[3].trim()) {
                                    parent.hannahbot_storage.reminders.splice(index, 1);
                                    break;
                                }

                            }
                            parent.functions.save_hannahbot_storage();

                            parent.functions.send_admin_telegram("[PART]", `Parted channel: ${command_args[3]} - by ${tags.username}`);
                            parent.functions.twitch_clientsay(channel, `[CHN] I have left ${command_args[3]}'s channel, @${tags.username} `);
                            return;
                        }).catch((err) => {
                            parent.functions.send_admin_telegram("[PART]", `Failed to leave channel: ${channel} with error: ${err} - by ${tags.username}`);
                            console.log(err);
                            parent.functions.twitch_clientsay(channel, `[CHN] I was not able to leave ${command_args[3]}'s channel, @${tags.username}! Please try again. `);
                            return;
                        });

                    }
                    return
                }

                if ((/^(list|l|all|listall)$/).test(command_args[2])) {
                    parent.functions.twitch_clientsay(channel, `[CHN] This command is currently in development, @${tags.username} `);
                    return

                    // if (clientwhisper(tags.username, `[CHN] I'm currently in these channels: ${String(client.getChannels()).split(",").join[", "]} `)) {
                    //     parent.functions.twitch_clientsay(channel, `[CHN] I have whispered you the channels list, @${tags.username} `);
                    //     return;
                    // } else {
                    //     parent.functions.twitch_clientsay(channel, `[CHN] I could not whisper you the channels list, @${tags.username} `);
                    //     return;
                    // }
                }

                parent.functions.twitch_clientsay(channel, `[CHN] Usage: ${command_args[0]} ${command_args[1]} [ join | leave | list ] `);
                return;

            case "discord":
                

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