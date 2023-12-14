// ./commands/error.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb error",
    version_added: "2.2",
    commands_regex: "(test)?error",
    usage: "error",
    supported_platforms: ["twitch", "discord", "twitch_whisper"],
    invocation: async (platform, channel, tags, message) => {

        switch (platform) {
            case "twitch":
                if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.admin", true)) { return; }

                throw new Error('Test Error!');
                
                return

            case "discord":
                throw new Error('Test Error!');
                return

            case "telegram":

                return

            case "web":

                return

            case "twitch_whisper":
                console.log("got successful test whisper")
                return

            default:
                break;
        }



    }
}