// ./commands/cutepic.js
// ========

var dog_api = "https://dog.ceo/api/breeds/image/random";
var parent = require.main.exports;

module.exports = {
    name: "hhb cute",
    version_added: "2.1",
    commands_regex: "(cute ?)?(dog|cat)? ?(pic(ture)?)",
    usage: "cute [dog|cat]",
    supported_platforms: ["twitch"],
    invocation: async (platform, channel, tags, message) => {

        if (platform === "twitch") {

            if(message.includes("dog")){
                parent.functions.getJSON(dog_api, "", function (err, data) {
                    if (err || data.status != "success") {
                        parent.functions.twitch_clientsay(channel, ` @${tags.username}, there was an error finding a dog pic. Sorry! `);
                    } else {
                        parent.functions.twitch_clientsay(channel, ` @${tags.username}, ${data.message} `);
    
                    }
                    return;
                }, 'GET')

                return;
            }

            if(message.includes("cat")){
                parent.functions.getJSON(dog_api, "", function (err, data) {
                    if (err || data.status != "success" || true) {
                        parent.functions.twitch_clientsay(channel, ` @${tags.username}, there was an error finding a cat pic. Sorry! `);
                    } else {
                        parent.functions.twitch_clientsay(channel, ` ${data.message} `);
    
                    }
                    return;
                }, 'GET')
                return;
            }

            parent.functions.getJSON(dog_api, "", function (err, data) {
                if (err || data.status != "success") {
                    parent.functions.twitch_clientsay(channel, ` @${tags.username}, there was an error finding a cute pic. Sorry! `);
                } else {
                    parent.functions.twitch_clientsay(channel, ` ${data.message} `);

                }
                return;
            }, 'GET')
            return;

            


            return

        } else if (platform === "discord") {
            //if (!parent.functions.hasPerm(channel, tags.author.id, "hhb.joke", true, "discord",tags)) { return; }

            return
        }
    }
}

