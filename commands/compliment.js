// ./commands/compliment.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb compliment",
    version_added: "2.0",
    commands_regex: "insult|compliment|admire|bless.*",
    supported_platforms: ["twitch", "discord"],
    invocation: async (platform, channel, tags, message) => {

        if (platform === "twitch") {
            //if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.compliment", true)) { return; }
            var command_args = message.split(/[\s]+/);

            if (command_args.length < 3) {
                //parent.functions.getJSON("https://complimentr.com/api", "", function (err, data) {
                parent.functions.getJSON("https://8768zwfurd.execute-api.us-east-1.amazonaws.com/v1/compliments", "", function (err, data) {
                    //parent.functions.twitch_clientsay(channel, ` @${tags.username}, ${data["compliment"]}! `);
                    if (err) {
                        parent.functions.twitch_clientsay(channel, ` @${tags.username}, there was an error finding a compliment. Sorry! `);
                    } else {
                        parent.functions.twitch_clientsay(channel, ` @${tags.username}, ${data} `);
                    }
                    return;
                }, 'GET')
            } else {
                if (command_args[2].toLowerCase() === "hannah_yee5") {
                    parent.functions.twitch_clientsay(channel, ` @${tags.username}, i'm not allowed to compliment myself FeelsBadMan  `);
                    return;
                }
                parent.functions.getJSON("https://8768zwfurd.execute-api.us-east-1.amazonaws.com/v1/compliments", "", function (err, data) {
                    if (err) {
                        parent.functions.twitch_clientsay(channel, ` @${tags.username}, there was an error finding a compliment. Sorry! `);
                    } else {
                        parent.functions.twitch_clientsay(channel, ` @${command_args[2].replace("@", "")}, ${data.toLowerCase()} `);
                    }
                    return;
                }, 'GET')
            }

            return

        } else if (platform === "discord") {
            //if (!parent.functions.hasPerm(channel, tags.author.id, "hhb.compliment", true, "discord",tags)) { return; }
            var command_args = message.split(/[\s]+/);

            if (command_args.length < 3) {
                parent.functions.getJSON("https://8768zwfurd.execute-api.us-east-1.amazonaws.com/v1/compliments", "", function (err, data) {
                    if (err) {
                        parent.functions.discord_clientsay(tags, `there was an error finding a compliment. Sorry! `, true);
                    } else {
                        parent.functions.discord_clientsay(tags, `${data} `, true);
                    }
                    return;
                }, 'GET')
            } else {
                parent.functions.getJSON("https://8768zwfurd.execute-api.us-east-1.amazonaws.com/v1/compliments", "", function (err, data) {
                    if (err) {
                        parent.functions.discord_clientsay(tags, `there was an error finding a compliment. Sorry! `, true);
                    } else {
                        parent.functions.discord_clientsay(tags, `${command_args[2]}, ${data.toLowerCase()} `, false);

                    }
                    return;
                }, 'GET')
            }

            return
        }
    }
}

