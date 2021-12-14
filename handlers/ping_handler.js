// ./functions/ping_handler.js
// ========
// Checks for pings in the message just recieved, 
// and pings appropriately


var parent = require.main.exports;

module.exports = {
    name: "ping handler",
    version_added: "beta 2.0",
    handle: async (platform, channel, tags, message) => {
        // calculate who needs to get this ping

        if(platform !== "twitch"){
            return [false];
        }

        try {
            Object.keys(parent.hannahbot_storage.pings).forEach(function (k) {

                // check if this person's pings are enabled, and if they have pings 
                if (parent.hannahbot_storage.pings[k].enabled === false || parent.hannahbot_storage.pings[k].pings_ === "NULL") return;

                // checks if the user recently talked in chat
                if (Date.now() - parent.hannahbot_storage.pings[k].time_last_talked < 30000) { return; }

                // check if they has a matching ping
                if (new RegExp(`( |^|"|@)(${parent.hannahbot_storage.pings[k].pings_})s?($| |"|'|\\/|,|\\.|!|\\?)`).test(message.toLowerCase())) {

                    // ignores their ignored channels
                    if (parent.hannahbot_storage.pings[k].ignored_channels.includes(channel.toLowerCase())) { return; }

                    // ignores their ignored users
                    if (parent.hannahbot_storage.pings[k].ignored_users.includes(tags.username.toLowerCase())) { return; }


                    // send the ping
                    parent.functions.send_telegram(parent.hannahbot_storage.pings[k].chat_id, `*${tags.username}* in ${channel} "${message}"`);
                }
            });
        } catch (error) {
            console.error(`[Error] could not send ping! ${error}`)
            //TODO: ping paul errors
        }
    }
}

