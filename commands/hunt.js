// ./commands/hunt.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb hunt",
    version_added: "2.1",
    commands_regex: "hunt",
    supported_platforms: ["twitch"],
    invocation: async (platform, channel, tags, message) => {

        if (platform === "twitch") {
            parent.functions.twitch_clientsay(channel, ` @${tags.username} You have not decided to look for no animals in no biome nowhere. You don't not spot nothing. Do not type "mb hunt pursue" in not the next 10min to not attempt to not capture it. `);
            return;
        }
    }
}