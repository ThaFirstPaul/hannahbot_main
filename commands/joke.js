// ./commands/joke.js
// ========

var joke_api = "https://official-joke-api.appspot.com/random_joke";
var only_safe_joke = "https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,racist,sexist"
var parent = require.main.exports;

module.exports = {
    name: "hhb joke",
    version_added: "2.1",
    commands_regex: "(bad|)joke|4head|self destruct",
    supported_platforms: ["twitch", "discord"],
    invocation: async (platform, channel, tags, message) => {

        if (platform === "twitch") {
            if (message.includes("dark")) {
                joke_api = "https://v2.jokeapi.dev/joke/Dark?blacklistFlags=nsfw,religious,racist,sexist&type=twopart"
            }

            parent.functions.getJSON(joke_api, "", function (err, data) {
                if (err) {
                    parent.functions.twitch_clientsay(channel, ` @${tags.username}, there was an error finding a joke. Sorry! `);
                } else {
                    parent.functions.twitch_clientsay(channel, ` ${data.setup} `);
                    setTimeout(() => {
                        if(data.punchline){
                            parent.functions.twitch_clientsay(channel, ` ${data.punchline} omE`);
                        } else {
                            parent.functions.twitch_clientsay(channel, ` ${data.delivery} AINTNOWAY `);
                        }
                        
                    }, 3500);
                    

                }
                return;
            }, 'GET')


            return

        } else if (platform === "discord") {
            //if (!parent.functions.hasPerm(channel, tags.author.id, "hhb.joke", true, "discord",tags)) { return; }

            parent.functions.getJSON(joke_api, "", function (err, data) {
                if (err) {
                    parent.functions.discord_clientsay(tags, `there was an error finding a joke. Sorry! `, true);
                } else {
                    if (data.type === "twopart") {
                        parent.functions.discord_clientsay(channel, ` ${data.setup} `);
                        setTimeout(() => {
                            parent.functions.discord_clientsay(channel, ` ${data.delivery} `);

                        }, 3500);
                    }
                    if (data.type === "single") {
                        parent.functions.discord_clientsay(channel, ` ${data.joke} `);
                    }
                }
                return;
            }, 'GET')


            return
        }
    }
}

