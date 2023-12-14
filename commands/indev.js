// ./commands/indev.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb indev",
    version_added: "2.0",
    commands_regex: "(in)?dev",
    usage: "indev",
    supported_platforms: ["twitch", "discord", "telegram"],
    invocation: async (platform, channel, tags, message) => {
        if (platform === "twitch") {
            parent.functions.twitch_clientsay(channel, `[DEV] This bot is currently in development, please bear with me @${tags.username} `)
            return
        }

        if (platform === "discord") {
            parent.functions.discord_clientsay(tags, `This bot is currently in development, please bear with me.`, true)
            return
        }

        if (platform === "telegram") {
            // get user chat_id from username
            parent.functions.telegram_clientsay(chat_id, `[DEV] This bot is currently in development, please bear with me. `)
            return
        }

        if (platform === "web") {
            parent.functions.web_clientsay(channel, `[DEV] This bot is currently in development, please bear with me. `)
            return
        }
    }
}
