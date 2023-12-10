// ./handlers/twitch_handler.js
// ========
// 
const tmi = require('tmi.js');

var parent = {};

var client, OPclient

module.exports = {
    name: "twitch handler",
    version_added: "2.0",
    get_client: () => {
        return client
    },
    get_OPclient: () => {
        return OPclient
    },
    test: async () => {
        parent = require.main.exports;
        console.log(parent.hannahbot_storage)
    },
    init: async function init(){
        return
    },
    start: async function start() {
        parent = require.main.exports;
        try {
            parent.hannahbot_storage.commands
            parent.debug ? console.error(`Imported commands from hannahbot storage.`) : ""
        } catch (error) {
            console.error(`[Error] Could not import commands from hannahbot storage! ${error}`)
            process.exit(1);
        }

        
        // initialise the account hannah_yee5
        parent.debug ? console.error(`Hannahbot twitch clients setting up`) : ""
        client = new tmi.Client({
            options: { debug: true },
            connection: {
                reconnect: true,
                secure: true
            },
            identity: {
                username: 'hannah_yee5',
                password: process.env.TWITCH_OAUTH_TOKEN_1,
            },
            channels: parent.hannahbot_storage["channels"]
        });

        // initialise the account paulitio
        OPclient = new tmi.Client({
            options: { debug: false },
            connection: {
                reconnect: true,
                secure: true
            },
            identity: {
                username: 'paulitio',
                password: process.env.TWITCH_OAUTH_TOKEN_2,
            },
            channels: ['paulitio']
        });

        parent.debug ? console.error(`Hannahbot connecting to twitch`) : ""
        client.connect().catch(console.error);
        OPclient.connect().catch(console.error);

        
        parent.debug ? console.error(`Hannahbot listening to twitch messages in channels: ${parent.hannahbot_storage["channels"]}`) : ""
        client.on('chat', (channel, tags, message, self) => {
            // if debug is enabled
            if (parent.debug.usermessages) console.log(`[TW MSG] ${channel} @${tags.username}: ${message}`)

            try {
                // send the recieved message to the ping handler
                //parent.handlers.ping_handler.handle("twitch", channel, tags, message);

            } catch (error) {
                console.error(`[Error] Could not pass message to ping_handler! ${error}`)
                //TODO: ping paul errors
            }

            // ignore own messages
            if (self) return;
            
            // cancel non hannahbot commands:
            if (!(/^(\!hannahbot|\!?hh?b)( |$)/).test(message.toLowerCase())) return;

            if ((/^(\!hannahbot|\!?hh?b)[\s]*$/).test(message.toLowerCase())) {
                parent.debug ? console.log(`Invoking "im hhb" message: (hhb)`) : ""
                parent.commands.hhb.invocation("twitch", channel, tags, message, client);
                return;
            }

            var commands_obj = Object.entries(parent.commands)
            for (let index = 0; index < commands_obj.length; index++) {
                const command_module = commands_obj[index][1];
                const command_name = commands_obj[index][0];
                
                parent.debug ? console.log(`Testing for command regex: (${command_module.commands_regex})`) : ""

                if (new RegExp(`^(\!hannahbot|\!?hh?b) (${command_module.commands_regex})($| )`).test(message.toLowerCase())) {
                    parent.debug ? console.log(`invoking command: (${command_name})`) : ""

                    if(!parent.commands[command_name].supported_platforms.includes("twitch")){
                        parent.functions.twitch_clientsay(channel, `[INFO] @󠀀${tags.username}, that command is not available on Twitch. `)
                        return
                    }

                    parent.commands[command_name].invocation("twitch", channel, tags, message)
                    .catch((reason) => {
                        parent.functions.twitch_clientsay(channel, `[INFO] @󠀀${tags.username}, that command could not be executed at this time. Sorry. `)
                        console.log(`[ERROR] could not execute command ${command_name}: ${reason} `)
                    });
                    
                    return;
                }
                
            }

            //

            // custom commands


            // command not found
            //parent.functions.clientsay()
            parent.functions.twitch_clientsay(channel,
                `[INFO] @󠀀${tags.username}, that command was not found. For a list of commands, visit: tinyurl.com/545uycyw `)
            
        });

        // On recieving a Twitch whisper:
        client.on('whisper', (from, tags, message, self) => {
            var message = message
            // if debug is enabled
            if (parent.debug.usermessages) console.log(`[TW /w] #${tags.username}: ${message}`)

            

            if ((/^(\!hannahbot|\!?hh?b)[\s]*$/).test(message.toLowerCase())) {
                parent.debug ? console.log(`Invoking "im hhb" message: (hhb)`) : ""
                parent.commands.hhb.invocation("whisper", from, tags, message, client);
                return;
            }

            var commands_obj = Object.entries(parent.commands)
            for (let index = 0; index < commands_obj.length; index++) {
                const command_module = commands_obj[index][1];
                const command_name = commands_obj[index][0];
                
                parent.debug ? console.log(`Testing for command regex: (${command_module.commands_regex})`) : ""

                if (new RegExp(`^((\!hannahbot|\!?hh?b)? )?(${command_module.commands_regex})($| )`).test(message.toLowerCase())) {
                    if (!(/^(\!hannahbot|\!?hh?b)[\s]+/).test(message.toLowerCase())){
                        message = "!hhb "+message;
                    }
                    
                    parent.debug ? console.log(`invoking command: (${command_name})`) : ""

                    if(!parent.commands[command_name].supported_platforms.includes("whisper")){
                        parent.functions.twitch_whisper(from, `[INFO] Sorry, that command is not available via whispers. `)
                        console.log(`[WARN] command: (${command_name}) does not support twitch_whisper`)
                        return;
                    }

                    try {
                        parent.commands[command_name].invocation("whisper", from, tags, message);
                    } catch (error) {
                        //parent.functions.twitch_clientsay(from, `[INFO] @󠀀${tags.username}, that command could not be executed at this time. Sorry. `)
                        console.log(`[ERROR] could not execute command ${command_name}: ${error}`)
                    }
                    
                    return;
                }
                
            }

            //

            // custom commands


            // command not found
            //parent.functions.clientsay()
            // parent.functions.twitch_clientsay(channel,
            //     `[INFO] @󠀀${tags.username}, that command was not found. For a list of commands, visit: hannahbot.xyz/#commands `)
            
        });
        return;

    }

}