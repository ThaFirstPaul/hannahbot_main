// ./commands/hhb definition.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb definition",
    description: "Looks up the definition of the given word.",
    version_added: "2.0",
    commands_regex: "define|whatis|lookup",
    usage: "define {word}",
    supported_platforms: ['twitch'],
    invocation: async (platform, channel, tags, message) => {

        if (platform === "twitch") {
            var command_args = message.split(/[\s]+/);

            if (command_args.length < 3) {
                parent.functions.twitch_clientsay(channel, `[DEF] @${tags.username} Command usage: \`${command_args[0]} ${command_args[1]} {word}\``)
                return
            }

            if (command_args.length > 3 && !Number.isNaN(parseInt(command_args[3]))){
                var definition_index = parseInt(command_args[3]);
            } else {
                var definition_index = 0
            }


            parent.functions.getJSON(`https://api.dictionaryapi.dev/api/v2/entries/en/${command_args[2].toLowerCase()}`, "", function (err, data) {
                console.log(data[0]["meanings"][0]["definitions"])
                console.log(typeof(data))

                if(data.hasOwnProperty("title")){
                    parent.functions.twitch_clientsay(channel, `[DEF] No definitions could be found, @${tags.username} `);
                } else {
                    var definitions = []
                    data.forEach(def_obj => {
                        definitions = definitions.concat(def_obj["meanings"])
                    });
                }

                
                //parent.functions.twitch_clientsay(channel, `[DEF] ${command_args[2]}: ${data["definitions"][definition_index]} - @${tags.username} `);
                return;
            }, 'GET')

            return
        }
    }
}
