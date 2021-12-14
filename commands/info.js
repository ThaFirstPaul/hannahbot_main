// ./commands/info.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb info",
    version_added: "2.0",
    supported_platforms: ["twitch", "discord","telegram","web"],
    invocation: (platform, channel, tags, message) => {
        if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.status", true)) { return; }
        var is_enabled = "in maintainance";
        if (parent.hannahbot_storage.vars.bot_enabled === true) is_enabled = "enabled";
        
        if(platform === "twitch"){
            parent.functions.twitch_clientsay(channel, 
                `[INFO] hannahbot v${parent.hannahbot_storage.version}. - I was born ${parent.functions.proper_date(Date.now() - parent.vars.bot_creation)} ago. 
            - Currently ${is_enabled} - Uptime: ${parent.functions.proper_date(Date.now() - parent.vars.last_restart)} FeelsStrongMan `);
            return;
        } 
    }
}