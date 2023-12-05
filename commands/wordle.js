// ./commands/hhb wordle.js
// ========

var parent = require.main.exports;

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }

module.exports = {
    name: "hhb wordle",
    version_added: "2.0",
    commands_regex: "wordle",
    supported_platforms: ["twitch"],
    invocation: async (platform, channel, tags, message) => {
        const choices = ["🟩", "⬛", "🟨"];
        var word = "";
        var length = Math.floor(Math.random() * 15)+4;

        for (var i = 1; i < length; i++) {
            word += `${choose(choices)} `;
        }

        var return_message = ` @${tags.username} ${word} ` 
        
        if(platform === "twitch"){
            parent.functions.twitch_clientsay(channel, return_message);
            return;
        }
    }
}
