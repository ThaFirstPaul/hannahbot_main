// ./main.js
// ========
// Imports all modules:
// - Functions (internal functions written for hannahbot)
// - Variables (hannahbot storage and memory)
// - Commands  (hannahbot commands)
// 
// Starts handlers:
// - twitch (and whisper) handler
// - discord handler
//

// Set debug mode
var debug = false;
if (process.argv.includes("--debug")) {
    debug = true;
    console.log("Enabled debug.")
}

if (process.argv.includes("--fulldebug")) {
    debug = {
        "usermessages": true,
        "errors": true,
        "info": true,
        "regex": true
    }
    console.log("Enabled debug.")
}

if (process.argv.includes("--gen_commands")) {
    console.log("Will generate commands list.")
}

if (process.argv.includes("--storage-readonly")) {
    console.log("Hannahbot-storage is read-only.")
}

// required main modules
const fs = require("fs");

var functions = {}
var commands = {}
var handlers = {}
var hannahbot_storage = {};
var vars = {}

vars.last_restart = Date.now();
vars.bot_creation = 1638724895000;

require('dotenv').config()

// try import hannahbot storage
try {
    hannahbot_storage = JSON.parse(fs.readFileSync('./hannahbot_storage.json', 'utf-8'));
    debug ? console.log(`Imported hannahbot_storage ${" ".repeat(33)}version:${hannahbot_storage.version}\n`) : ""
} catch (error) {
    console.error(`[Error] Could not import hannahbot storage! ${error}`)
    process.exit(1);
}


// export all
module.exports = {
    debug: debug,
    functions: functions,
    hannahbot_storage: hannahbot_storage,
    commands: commands,
    handlers: handlers,
    vars: vars
}

// import all commands
fs.readdirSync('./commands').forEach(function (file) {
    try {
        if(!hannahbot_storage.commands.hasOwnProperty(file.split(".")[0])){
            hannahbot_storage.commands[file.split(".")[0]] = {"enabled":false}
        } 
        // checks if the module is disabled
        if (hannahbot_storage.commands[file.split(".")[0]].enabled === false) {
            if (debug) { console.log(`Skipped disabled command: (${file}) `) }
            return
        }

        const module_ = require(`./commands/${file}`);
        commands[file.split(".")[0]] = module_;
        
        if (debug) { console.log(`Imported command: ${file}${" ".repeat(40 - file.toString().length)}  version:${module_.version_added}`) }
    } catch (err) {
        console.log(`Failed to import command ${file}: ${err}`)
    }
})
console.log(`Done importing commands`);

if (process.argv.includes("--gen_commands")) { 
    console.log(`Generating json with all active commands. `)

    // Write commands list to ./commands_list.json
    try {
        to_write = {commands, created:Date.now(), version:hannahbot_storage.version}
        fs.writeFileSync('./commands_list.json',
        JSON.stringify(to_write), 'utf-8')
        console.log("Created updated commands list");
    } catch (error) {
        console.log(`[WARN] Failed to update commands list: ${error}`);
    }
}

console.log(``)
// import all internally needed functions
fs.readdirSync('./functions').forEach(function (file) {
    try {
        const function_ = require(`./functions/${file}`);
        if (function_.module_type === "single") {
            functions[file.split(".")[0]] = function_.invocation;
        } else {
            functions[file.split(".")[0]] = function_;
        }

        if (debug) { console.log(`Imported function: ${file}${" ".repeat(40 - file.toString().length)} version:${function_.version_added}`) }
    } catch (err) {
        console.log(`Failed to import function ${file}: ${err}`)
    }
})
console.log(`Done importing functions.`);
if (debug) { console.log(`All active funtions: ${Object.keys(functions)}\n`) }


// import all handlers
fs.readdirSync('./handlers').forEach(function (file) {
    try {
        handlers[file.split(".")[0]] = require(`./handlers/${file}`);
        if (debug) { console.log(`Imported handler: ${file}${" ".repeat(file.toString().length)}`) }
    } catch (err) {
        console.log(`Failed to import handler ${file}: ${err}`)
    }
})
console.log(`Done importing handlers.`);
if (debug) { console.log(`All active handlers: ${Object.keys(handlers)}\n`) }

// save hannahbot_storage
functions.save_hannahbot_storage()

// Start the handlers for twitch, discord, telegram, and web
if (process.argv.includes("--no-handlers")) { 
    console.log(`Ending here, as no handlers have been enabled. `)
    process.exit(1);
}

try {
    handlers.twitch_handler.start()
} catch (error) {
    console.log(`[ERROR] Failed to start twitch handler: ${error}`)
}

try {
    handlers.discord_handler.start()
} catch (error) {
    console.log(`[ERROR] Failed to start discord handler:${error.code} ${error}`)
}
// TODO: start other handlers


// set window title
process.title = `Hannahbot v${hannahbot_storage.version}` + (debug ? " (debugging enabled)" : "");
