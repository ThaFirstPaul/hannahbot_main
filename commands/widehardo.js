// ./commands/hhb widehardo.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb widehardo",
    version_added: "2.0",
    commands_regex: "widehardo.*",
    usage: "widehardo",
    supported_platforms: ["twitch"],
    invocation: async (platform, channel, tags, message) => {
        var return_message = ` @${tags.username} WideHardo ` 
        
        if(platform === "twitch"){
            parent.functions.twitch_clientsay(channel, return_message);
            return;
        }
    }
}
