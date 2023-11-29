// ./commands/commands.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb commands",
    version_added: "2.0",
    commands_regex: "comm?|commands?|help|list|\\?",
    supported_platforms: ["twitch", "discord"],
    invocation: async (platform, channel, tags, message) => {

        switch (platform) {
            case "twitch":
                //if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.commands.list", true)) { return; }
               
                parent.functions.twitch_clientsay(channel, `[INFO] @󠀀${tags.username}, all commands can be seen at: hannahbot.xyz/#commands `);
                return

            case "discord":
                //if (!parent.functions.hasPerm(channel, tags.author.id, "hhb.commands.list", true, "discord", tags)) { return; }
                parent.functions.discord_clientsay(tags, `All commands can be seen at:\nhttps://hannahbot.xyz/#commands`, true);
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
