// ./commands/yourmum.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb yourmum",
    version_added: "2.1",
    commands_regex: "yourm(u|o)m",
    supported_platforms: ["twitch"],
    invocation: (platform, channel, tags, message) => {

        if (platform === "twitch") {
            parent.functions.twitch_clientsay(channel, ` No your mum, @${tags.username} `);
            return;
        }
    }
}