// ./commands/hhb.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb",
    version_added: "2.0",
    commands_regex: "NULL",
    supported_platforms: ["twitch", "discord"],
    invocation: async (platform, channel, tags, message) => {
        console.log(parent.vars.bot_enabled)
        var command_args = message.split(/[\s]+/);
        
        var return_message = parent.vars.bot_enabled ? `I'm hannahbot, use "${command_args[0]} help" for a list of commands.`: `I'm hannahbot. I am currently in maintainance, please bear with me.`
        
        if(platform === "twitch"){
            parent.functions.twitch_clientsay(channel, `Hi @${tags.username}! ` + return_message + " peepoHappy ");
            return;
        }

        if(platform === "discord"){
            parent.functions.discord_clientsay(tags, return_message, true);
            return;
        }
    }
}
