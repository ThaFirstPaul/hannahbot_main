// ./commands/mycolor.js
// ========

const ntc = require('ntcjs');

var parent = require.main.exports;

module.exports = {
    name: "hhb mycolor",
    version_added: "2.0",
    commands_regex: "mycolou?r|mycol|colou?r",
    usage: "mycolor",
    supported_platforms: ["twitch"],
    invocation: async (platform, channel, tags, message) => {

        switch (platform) {
            case "twitch":
                if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.mycolor", true)) { return; }
                const col = ntc.name(tags.color)
                parent.functions.twitch_clientsay(channel, `[INFO] @${tags.username}, your colour is ${col[1]} (${tags.color}) `)
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