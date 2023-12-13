// ./commands/hhb say.js
// ========

const { to } = require("color-string");

var parent = require.main.exports;

module.exports = {
    name: "hhb say",
    version_added: "2.2",
    commands_regex: "(say|repeat|echo)",
    supported_platforms: ["twitch"],
    invocation: async (platform, channel, tags, message) => {

        if (platform === "twitch") {
            if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.say", true)) { return; }
            var command_args = message.split(/[\s]+/);

            var to_say = command_args.slice(2);

            if ((/say /).test(to_say.join(" "))) {
                parent.functions.twitch_clientsay(channel,  `@${tags.username}, No u say that. peepoHappy `);
                return;
            }

            if ((/(\/|\\)/).test(message.toLowerCase())) {
                parent.functions.twitch_clientsay(channel,  `@${tags.username}, I'm not saying that. peepoHappy `);
                return;
            }

            parent.functions.twitch_clientsay(channel, to_say.join(" ")); 
            
                

            return

        } 
    }
}