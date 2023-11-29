// ./commands/joke.js
// ========

var joke_api = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw";
var parent = require.main.exports;

module.exports = {
    name: "hhb joke",
    version_added: "2.0",
    commands_regex: "(tell|)(bad|)joke|4head",
    supported_platforms: ["twitch", "discord"],
    invocation: async (platform, channel, tags, message) => {

        if (platform === "twitch") {

            if (message.match(/badjoke/)) {
                joke_api = "https://v2.jokeapi.dev/joke/Any";
            }

            parent.functions.getJSON(joke_api, "", function (err, data) {
                if (err) {
                    parent.functions.twitch_clientsay(channel, ` @${tags.username}, there was an error finding a joke. Sorry! `);
                } else {
                    if (data.type === "twopart") {
                        parent.functions.twitch_clientsay(channel, ` ${data.setup} `);
                        setTimeout(() => {
                            parent.functions.twitch_clientsay(channel, ` ${data.delivery} `);
                        }, 3500);
                    }
                    if (data.type === "single") {
                        parent.functions.twitch_clientsay(channel, ` ${data.joke} `);
                    }

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

