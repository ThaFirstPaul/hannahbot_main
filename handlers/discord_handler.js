// ./handlers/discord_handler.js
// ========
// 
const Discord = require("discord.js");

var parent = {};

var client, OPclient

module.exports = {
    name: "discord handler",
    version_added: "2.0",
    get_client: () => {
        return client
    },
    start: async function start() {
        parent = require.main.exports;

        // initialise the discord hannahbot
        parent.debug ? console.error(`{DISCORD} Hannahbot discord client and queue setting up`) : ""
        parent.debug ? console.error(`{DISCORD} Hannahbot connecting to discord`) : ""
        const client =  (() => {
            try {
                const client_ = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
                return client_;
            } catch (error) {
                return false;
            }})();

        if (client === false){
            console.error(`[ERROR] Hannahbot discord client could not be set up: ${error}`);
            return;
        }

        const queue = new Map();

        try {
            parent.hannahbot_storage.commands
            parent.debug ? console.error(`{DISCORD} Imported commands from hannahbot storage.`) : ""
        } catch (error) {
            console.error(`{DISCORD} [Error] Could not import commands from hannahbot storage! ${error}`)
            return;
        }

        client.once("ready", () => {
            console.log("{DISCORD} Ready!");
        });

        client.once("reconnecting", () => {
            console.log("{DISCORD} Reconnecting!");
        });

        client.once("disconnect", () => {
            console.log("{DISCORD} Disconnected!");
        });

        parent.debug ? console.error(`{DISCORD} Hannahbot listening to discord messages`) : ""
        client.on('messageCreate', async message => {
            // ignore bot messages
            if (message.author.bot === true) return;

            // if debug is enabled
            if (parent.debug.usermessages) console.log(`{DISCORD} ${message.channel.guild.name} @${message.author.username}: ${message.content}`)

            // cancel non hannahbot commands:
            if (!(/^(\!hannahbot|\!?hh?b)(d|_dev)?( |$)/).test(message.content.toLowerCase())) return;

            if ((/^(\!hannahbot|\!?hh?b)(d|_dev)?[\s]*$/).test(message.content.toLowerCase())) {
                parent.debug ? console.log(`{DISCORD} Invoking "im hhb" message: (hhb)`) : ""
                parent.commands.hhb.invocation("discord", message.channel, message, message.content);
                return;
            }

            var commands_obj = Object.entries(parent.commands)
            for (let index = 0; index < commands_obj.length; index++) {
                const command_module = commands_obj[index][1];
                const command_name = commands_obj[index][0];

                parent.debug ? console.log(`{DISCORD} Testing for command regex: (${command_module.commands_regex})`) : ""

                if (new RegExp(`^(\!hannahbot|\!?hh?b)(d|_dev)? (${command_module.commands_regex})($| )`).test(message.content.toLowerCase())) {
                    parent.debug ? console.log(`{DISCORD} invoking command: (${command_name})`) : ""

                    if (!parent.commands[command_name].supported_platforms.includes("discord")) {
                        parent.functions.discord_clientsay(message,`that command is not available on Discord. `, true)
                        return
                    }

                    parent.commands[command_name].invocation("discord", message.channel, message, message.content)
                    .catch((error) => {
                        parent.functions.discord_clientsay(message,`that command could not be executed at this time. Sorry. `, true)
                        console.log(`{DISCORD} [ERROR] could not execute command ${command_name}: ${error} ${error.stack}`)
                    });

                    return;
                }

            }

            //

            // custom commands


            // command not found
            //parent.functions.clientsay()
            parent.functions.discord_clientsay(message,`that command was not found. For a list of commands, visit: https://hannahbot.xyz/#commands `,true)

        });
        

        try {
            client.login(process.env.DISCORD_TOKEN)
        } catch (error) {
            console.error(`[ERROR] Hannahbot discord client login failed: ${error}`);
            return;
        }

    }

    

}