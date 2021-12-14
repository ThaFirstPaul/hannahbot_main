// ./functions/proper_date.js
// ========
// returns a dhms time from a given ms

parent = require.main.exports;

module.exports = {
	name: "twitch_clientsay",
	version_added: "2.0",
    module_type: "single",
    invocation: (channel, to_say) => {
        parent.debug ? console.log(`Sending message in twitch chat: ${channel} -> ${to_say}`) : ""
        parent.handlers.twitch_handler.get_client().say(channel, '(HHB_DEV)' + to_say).then(function (data) {
            return true;
        }).catch(function (err) {
            console.error(`[Error] Could not send message in twitch chat: ${err}`)
            // TODO send_paul_telegram(`[ERROR]`, `Failed to send message in chat`, `${err}`);
            return false;
        });
    }
}