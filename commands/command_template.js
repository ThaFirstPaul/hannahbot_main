// ./commands/command.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb command",
    version_added: "2.0",
    commands_regex: "otherregex",
    usage: "command {required} [optional]",
    supported_platforms: ["twitch", "twitch_whisper", "discord", "telegram", "web"],
    invocation: async (platform, channel, tags, message) => {

        switch (platform) {
            case "twitch":
                if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.admin", true)) { return; }
                const command_args = message.split(/[\s]+/);
                parent.functions.twitch_clientsay(channel, `message`)
                return

            case "twitch_whisper":

                return

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