// ./commands/hhb german.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb german",
    description: "Replies with a german phrase.",
    version_added: "2.0",
    commands_regex: "(german|deutsch).*",
    usage: "german",
    supported_platforms: ["twitch"],
    invocation: async (platform, channel, tags, message) => {
        var return_message = ` @${tags.username} Dieser Kommunikationsraum ist jetzt deutsch YAA ` 
        
        if(platform === "twitch"){
            parent.functions.twitch_clientsay(channel, return_message);
            return;
        }
    }
}
