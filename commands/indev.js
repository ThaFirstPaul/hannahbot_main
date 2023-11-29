// ./commands/indev.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb indev",
    version_added: "2.0",
    supported_platforms: ["twitch", "discord"],
    invocation: (platform, channel, tags, message) => {
        if (platform === "twitch") {
            parent.functions.twitch_clientsay(channel, `[DEV] This command is currently in development, please bear with me @${tags.username} `)
            return
        }

        if (platform === "discord") {
            parent.functions.discord_clientsay(tags, `This command is currently in development, please bear with me.`, true)
            return
        }

        if (platform === "telegram") {
            parent.functions.telegram_clientsay(channel, `[DEV] This command is currently in development, please bear with me. `)
            return
        }

        if (platform === "web") {
            parent.functions.web_clientsay(channel, `[DEV] This command is currently in development, please bear with me. `)
            return
        }
    }
}
