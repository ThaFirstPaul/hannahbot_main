// ./commands/yourmum.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb yourmum",
    description: "Gets mad at the person who used the command.",
    version_added: "2.1",
    commands_regex: "yourm(u|o)m( ?joke)?",
    usage: "yourmum",
    supported_platforms: ["twitch"],
    invocation: async (platform, channel, tags, message) => {

        if (platform === "twitch") {
            parent.functions.twitch_clientsay(channel, ` No your mum, @${tags.username} `);


            return;
        }
    }
}