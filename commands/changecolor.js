// ./commands/changecolor.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb changecolor",
    version_added: "2.0",
    commands_regex: "changecolou?r",
    supported_platforms: ["twitch"],
    invocation: async (platform, channel, tags, message) => {
        var command_args;

        switch (platform) {
            case "twitch":
                if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.admin.changecolor", true)) { return; }
                command_args = message.split(/[\s]+/);

                parent.handlers.twitch_handler.get_client().color(command_args[2]).then((data) => {
                    parent.functions.twitch_clientsay(channel, `[INFO] My color has been updated, @${tags.username} `);
                }).catch((err) => {
                    parent.functions.twitch_clientsay(channel, `[INFO] My color failed to update, @${tags.username} `);
                });
                return;

            case "discord":
                if (!parent.functions.hasPerm(channel, tags.author.username.toLowerCase(), "hhb.admin.changecolor", true, "discord")) { return; }
                command_args = message.split(/[\s]+/);

                


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