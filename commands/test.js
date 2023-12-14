// ./commands/test.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb test",
    version_added: "2.0",
    commands_regex: "modcheck|pausechamp|test|dinkdonk|check|👋",
    usage: "test",
    supported_platforms: ["twitch", "discord", "twitch_whisper"],
    invocation: async (platform, channel, tags, message) => {

        switch (platform) {
            case "twitch":
                if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.admin", false)) { 
                    parent.functions.twitch_clientsay(channel, `[INFO] @${tags.username} DinkDonk `)
                    return; 
                }

                const command_args = message.split(/[\s]+/);
                parent.functions.twitch_clientsay(channel, `[ADMIN] @${tags.username} DinkDonk `)
                
                return

            case "discord":
                parent.functions.discord_clientsay(tags, `👋`, true)
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