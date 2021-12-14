// ./functions/twitch_handler.js
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
        client.on('message', (channel, tags, message, self) => {
            // if debug is enabled
            if (parent.debug.usermessages) console.log(`${channel} @${tags.username}: ${message}`)

            try {
                // send the recieved message to the ping handler
                parent.handlers.ping_handler.handle("twitch", channel, tags, message);

            } catch (error) {
                console.error(`[Error] Could not pass message to ping_handler! ${error}`)
                //TODO: ping paul errors
            }

            // cancel non hannahbot commands:
            if (!(/^(\!hannahbot|\!?hh?b)(d|_dev)( |$)/).test(message.toLowerCase())) return;
            if ((/^(\!hannahbot|\!?hh?b)(d|_dev)[\s]*$/).test(message.toLowerCase())) {
                parent.commands["hhb"].invocation("twitch", channel, tags, message);
                return
            }

            if ((/^(\!hannahbot|\!?hh?b)(d|_dev)[ \t]+$/).test(message.toLowerCase())) {
                parent.debug ? console.log(`Invoking "im hhb" message: (hhb)`) : ""
                parent.commands.hhb.invocation("twitch", channel, tags, message, client);
                return;
            }

            // handle commands
            // main commands
            for (var index in Object.values(parent.hannahbot_storage.commands)) {
                const command_obj = Object.values(parent.hannahbot_storage.commands)[index];
                parent.debug ? console.log(`Testing for command regex: (${command_obj.commands_regex})`) : ""

                if (new RegExp(`^(\!hannahbot|\!?hh?b)(d|_dev) (${command_obj.commands_regex})($| )`).test(message.toLowerCase())) {
                    parent.debug ? console.log(`invoking command: (${command_obj.command})`) : ""
                    try {
                        parent.commands[command_obj.command.replace("PLATFORM", "twitch")].invocation("twitch", channel, tags, message);
                    } catch (error) {
                        parent.functions.twitch_clientsay(channel, `[INFO] @󠀀${tags.username}, that command could not be executed. Sorry. `)
                    }
                    
                    
                    return;
                }
            }

            //

            // custom commands


            // command not found
            //parent.functions.clientsay()
            parent.functions.twitch_clientsay(channel,
                `[INFO] @󠀀${tags.username}, that command was not found. For a list of commands, visit: hannahbot.xyz/#commands `)
            
        });
        return;

    }

}