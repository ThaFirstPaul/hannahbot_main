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

        
        // initialise the main bot account
        parent.debug ? console.error(`Hannahbot twitch clients setting up`) : ""
        client = new tmi.Client({
            options: { debug: true },
            connection: {
                reconnect: true,
                secure: true
            },
            identity: {
                username: process.env.TWITCH_USERNAME_1,
                password: process.env.TWITCH_OAUTH_TOKEN_1,
            },
            channels: parent.hannahbot_storage["channels"]
        });

        // initialise the owner's account 
        OPclient = new tmi.Client({
            options: { debug: false },
            connection: {
                reconnect: true,
                secure: true
            },
            identity: {
                username: process.env.TWITCH_USERNAME_OWNER,
                password: process.env.TWITCH_OAUTH_TOKEN_OWNER,
            },
            channels: [process.env.TWITCH_USERNAME_OWNER]
        });

        parent.debug ? console.error(`Hannahbot connecting to twitch`) : ""
        client.connect().catch(console.error);
        OPclient.connect().catch(console.error);

        
        parent.debug ? console.error(`Hannahbot listening to twitch messages in channels: ${parent.hannahbot_storage["channels"]}`) : ""
        client.on('chat', (channel, tags, message, self) => {
            // if debug is enabled
            if (parent.debug.usermessages) console.log(`[TW MSG] ${channel} @${tags.username}: ${message}`);

            // check if hannahbot is enabled => if not, only check for enable command
            if (!parent.hannahbot_storage.vars.bot_enabled === true) {
                // ignore non hannahbot commands:
                if (!(/^(\!hannahbot|\!?hh?b)( |$)/).test(message.toLowerCase())) return;

                // check for enable command
                if (!(/^(\!hannahbot|\!?hh?b)[\s]*enable( |$)/).test(message.toLowerCase())) return;

                // check for enable command permissions
                if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.admin", true, platform="twitch")) { return; }

                // enable hannahbot 
                parent.functions.twitch_clientsay(channel, `[ADMIN] I have been globally enabled. `);
                parent.hannahbot_storage.vars.bot_enabled = true;
                parent.functions.save_hannahbot_storage();
                return;
            }

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

            if (parent.debug) console.log(`┌-< ${channel} @${tags.username}: ${message}`);

            var commands_obj = Object.entries(parent.commands)
            for (let index = 0; index < commands_obj.length; index++) {
                const command_module = commands_obj[index][1];
                const command_name = commands_obj[index][0];
                
                if (parent.debug.regex) console.log(`├- Testing for command regex: (${command_module.commands_regex})`);

                if (new RegExp(`^(\!hannahbot|\!?hh?b) (${command_module.commands_regex})($| )`).test(message.toLowerCase())) {
                    parent.debug ? console.log(`└---> invoking command: (${command_name})`) : ""

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

            // command not found
            parent.debug ? console.log(`└--->  command not found`) : "";
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
                parent.commands.hhb.invocation("twitch_whisper", from, tags, message, client);
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

                    if(!parent.commands[command_name].supported_platforms.includes("twitch_whisper")){
                        parent.functions.twitch_whisper(from, `[INFO] Sorry, that command is not available via whispers. `)
                        console.log(`[WARN] command: (${command_name}) does not support twitch_whisper`)
                        return;
                    }

                    try {
                        parent.commands[command_name].invocation("twitch_whisper", from, tags, message);
                    } catch (error) {
                        //parent.functions.twitch_clientsay(from, `[INFO] @󠀀${tags.username}, that command could not be executed at this time. Sorry. `)
                        console.log(`[ERROR] could not execute command ${command_name}: ${error}`)
                    }
                    
                    return;
                }
                
            }
        });
        return;

    }

}