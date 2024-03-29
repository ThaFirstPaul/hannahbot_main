// ./commands/modules.js
// ========

var parent = require.main.exports;
const path = require("path")

module.exports = {
    name: "hhb modules",
    description: "View and (un|re)load the modules active in Hannahbot.",
    version_added: "2.1",
    commands_regex: "(modules?|m)",
    usage: "module {load|unload|reload} {module}",
    supported_platforms: ["twitch", "twitch_whisper"],
    invocation: async (platform, channel, tags, message) => {
        if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.modules", true)) { return; }

        switch (platform) {
            case "twitch_whisper":
                var clientsay = function(...args){return;}
            case "twitch":
                if (!clientsay){clientsay = parent.functions.twitch_clientsay;}

                var command_args = message.split(/[\s]+/);
                if (command_args.length < 3) {
                    clientsay(channel, `[ADMIN] @${tags.username} Command usage: \`${command_args[0]} ${command_args[1]} (load|unload|reload) {module_type}/{module_name}\``)
                    return
                }

                if (/^(l|list|all)$/.test(command_args[2])) {
                    if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.modules.list", true)) { return; }
                    clientsay(channel, `[ADMIN] @${tags.username}, active modules: ${Object.keys(parent.commands).join(", ")}`)
                    return
                }

                if (/^(reloadm?|rlm?|reloadmodule)$/.test(command_args[2])) {
                    if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.modules.reload", true)) { return; }

                    if (command_args.length < 4) {
                        clientsay(channel, `[ADMIN] @${tags.username} Command usage: \`${command_args[0]} ${command_args[1]} ${command_args[1]} {module_type}/{module_name}\``)
                        return
                    }

                    if (Object.keys(parent.commands).includes(command_args[3].toLowerCase().trim())) {
                        if (unload_module(command_args[3].toLowerCase().trim())) {
                            load_module(command_args[3].toLowerCase().trim()) ?
                                clientsay(channel, `[ADMIN] Reloaded the module: ${command_args[3]} (v${parent.commands[command_args[3]].version_added}), @${tags.username}`) :
                                clientsay(channel, `[ADMIN] Could not reload the module: ${command_args[3]}, @${tags.username}`)

                        } else {
                            clientsay(channel, `[ADMIN] Could not unload the module: ${command_args[3]}, @${tags.username}`)
                        }
                    } else {
                        clientsay(channel, `[ADMIN] That module was not found, or is not active @${tags.username}. Use \`${command_args[0]} loadmodule {module_type}/{module_name}\` instead.`)
                    }
                    return
                }

                if (/^(loadm?|lm?|loadmodule)$/.test(command_args[2])) {
                    if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.modules.load", true)) { return; }

                    if (command_args.length < 4) {
                        clientsay(channel, `[ADMIN] @${tags.username} Command usage: \`${command_args[0]} ${command_args[1]} ${command_args[1]} {module_type}/{module_name}\``)
                        return
                    }

                    if (!Object.keys(parent.commands).includes(command_args[3].toLowerCase().trim())) {
                        parent.hannahbot_storage.commands[command_args[3].toLowerCase().trim()].enabled = true;
                        parent.functions.save_hannahbot_storage();

                        load_module(command_args[3].toLowerCase().trim()) ?
                            clientsay(channel, `[ADMIN] Loaded the module: ${command_args[3]} (v${parent.commands[command_args[3].toLowerCase()].version_added}), @${tags.username}`) :
                            clientsay(channel, `[ADMIN] Could not load the module: ${command_args[3]}, @${tags.username}`)
                    } else {
                        clientsay(channel, `[ADMIN] That module is already active @${tags.username}. Use \`${command_args[0]} reloadmodule {module_type}/{module_name}\` instead.`)
                    }
                    return
                }

                if (/^(unloadm?|ulm?|unloadmodule)$/.test(command_args[2])) {
                    if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.modules.unload", true)) { return; }

                    if (command_args.length < 4) {
                        clientsay(channel, `[ADMIN] @${tags.username} Command usage: \`${command_args[0]} ${command_args[1]} ${command_args[1]} {module_type}/{module_name}\``)
                        return
                    }

                    var non_disable_modules = ["modules", "disable", "hhb"]
                    if(non_disable_modules.indexOf(command_args[3].toLowerCase().trim()) > -1){
                        clientsay(channel, `[ADMIN] That module cannot be unloaded @${tags.username}.`)
                        return
                    }

                    if (Object.keys(parent.commands).includes(command_args[3].toLowerCase().trim())) {
                        parent.hannahbot_storage.commands[command_args[3].toLowerCase().trim()].enabled = false;
                        parent.functions.save_hannahbot_storage();

                        unload_module(command_args[3].toLowerCase().trim()) ?
                            clientsay(channel, `[ADMIN] Unoaded the module: ${command_args[3]}, @${tags.username}`) :
                            clientsay(channel, `[ADMIN] Could not unload the module: ${command_args[3]}, @${tags.username}`)
                    } else {
                        clientsay(channel, `[ADMIN] That module was not found, or is not active @${tags.username}.`)
                    }
                    return
                }

            default:
                break;
        }



    }
}

function unload_module(module) {

    // remove the module
    try {
        delete require.cache[require.resolve(path.resolve(`./commands/${module}.js`))]
        delete parent.commands[module]
        if (parent.debug) { console.log(`Unloaded command: ${module}`) }
        return true
    } catch (err) {
        console.log(`Failed to reload the command "${module}": ${err}\n${err.stack}`)
        return false;
    }
}

function load_module(module) {

    //import the module
    try {
        const module_ = require(path.resolve(`./commands/${module}.js`));
        parent.commands[module.split(".")[0]] = module_;
        if (parent.debug) { console.log(`Imported command: ${module}${" ".repeat(40 - module.toString().length)}  version:${module_.version_added}`) }
        return true
    } catch (err) {
        console.log(`Failed to reload the command "${module}": ${err}\n${err.stack}`)
        return false;
    }
}
