// ./commands/command.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb reminder",
    version_added: "2.0",
    commands_regex: "(reminders?|rem)",
    usage: "remind {me|user} in {when} {message}",
    supported_platforms: ["twitch"],
    invocation: async (platform, channel, tags, message) => {

        switch (platform) {
            case "twitch":
                if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.admin", true)) { return; }
                const command_args = message.split(/[\s]+/);
                parent.functions.twitch_clientsay(channel, `message`)
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


function calculate_command(message) {
    
}