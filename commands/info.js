// ./commands/info.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb info",
    description: "Responds with the Version, Age, Uptime and RAM usage.",
    version_added: "2.0",
    commands_regex: "(status|info|i|uptime)s?",
    usage: "info",
    supported_platforms: ["twitch", "discord"],
    invocation: async (platform, channel, tags, message) => {
    
        return new Promise((resolve, reject) => {

            if (platform === "twitch") {
                //if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.status", true)) { return; }
                parent.functions.twitch_clientsay(channel,
                    `[INFO] hannahbot v${parent.hannahbot_storage.version}. - I was born ${parent.functions.proper_date(Date.now() - parent.vars.bot_creation)} ago. 
                - Uptime: ${parent.functions.proper_date(Date.now() - parent.vars.last_restart)} - RAM Usage: ${get_ram()} FeelsStrongMan `);
                return;

            }
            
            if (platform === "discord") {
                //if (!parent.functions.hasPerm(tags, tags.author.username.toLowerCase(), "hhb.status", true, "discord")) { return; }
                tags.reply(
                    `\n[INFO] hannahbot v${parent.hannahbot_storage.version}.\n - I was born ${parent.functions.proper_date(Date.now() - parent.vars.bot_creation)} ago.\n - Uptime: ${parent.functions.proper_date(Date.now() - parent.vars.last_restart)}\n - RAM Usage: ${get_ram()} `);
                return;

            }
        }); // end of promise
    } // end of invocation
}; // End of exports


function get_ram() {
    var curr_ram, total_ram;

    if (process.memoryUsage().heapTotal > 1048576) {
        total_ram = parseFloat(process.memoryUsage().heapTotal / 1048576).toFixed(2).toString() + "MB"
        curr_ram = parseFloat(process.memoryUsage().heapUsed / 1048576).toFixed(2).toString()
    } else if (process.memoryUsage().heapTotal > 1024) {
        total_ram = parseFloat(process.memoryUsage().heapTotal / 1024).toFixed(2).toString() + "KB"
        curr_ram = parseFloat(process.memoryUsage().heapUsed / 1024).toFixed(2).toString()
    } else {
        total_ram = parseFloat(process.memoryUsage().heapTotal).toFixed(2).toString() + "B"
        curr_ram = parseFloat(process.memoryUsage().heapUsed).toFixed(2).toString()
    }

    return `${curr_ram}/${total_ram}`


}
