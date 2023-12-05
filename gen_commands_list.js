const fs = require("fs");

var commands = {}
var hannahbot_storage = {}

hannahbot_storage = JSON.parse(fs.readFileSync('./hannahbot_storage.json', 'utf-8'));

// import all commands
fs.readdirSync('./commands').forEach(function (file) {
    try {
        if(!hannahbot_storage.commands.hasOwnProperty(file.split(".")[0])){
            hannahbot_storage.commands[file.split(".")[0]] = {"enabled":true}
        } 
        // checks if the module is disabled
        if (hannahbot_storage.commands[file.split(".")[0]] === false) return

        const module_ = require(`./commands/${file}`);
        commands[file.split(".")[0]] = module_;
        
        console.log(`Imported command: ${file}${" ".repeat(40 - file.toString().length)} version:${module_.version_added}`

        ) 
        
    } catch (err) {
        console.log(`Failed to import command ${file}: ${err}`)
    }

})

console.log(commands);