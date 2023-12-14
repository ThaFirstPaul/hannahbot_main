// ./commands/messageuuid.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb messageuuid",
    version_added: "2.0",
    commands_regex: "messageu?u?id|m?u?u?id",
    usage: "messageuuid",
    supported_platforms: ["twitch", "discord"],
    invocation: async (platform, channel, tags, message) => {

        switch (platform) {
            case "twitch":
                //if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.messageuuid", true)) { return; }
                parent.functions.twitch_clientsay(channel, `@${tags.username}, the UUID is: ${tags.id} `)
                return

            case "discord":
                //if (!parent.functions.hasPerm(channel, tags.author.id, "hhb.messageuuid", true, "discord", tags)) { return; }
                parent.functions.discord_clientsay(tags, `the id of that message is: ${tags.id} `, true)
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