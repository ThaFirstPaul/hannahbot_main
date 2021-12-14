// ./commands/hhb.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb",
    version_added: "2.0",
    supported_platforms: ["twitch", "discord","telegram","web"],
    invocation: async (platform, channel, tags, message) => {
        console.log(parent.vars.bot_enabled)
        var return_message = parent.vars.bot_enabled ? `Hi @${tags.username}! I'm hannahbot, use "!hhb help" for a list of commands. peepoHappy `: `Hi @${tags.username}! I'm hannahbot. I am currently in maintainance, please bear with me.`
        
        if(platform === "twitch"){
            parent.functions.twitch_clientsay(channel, return_message);
            return;
        }
    }
}
