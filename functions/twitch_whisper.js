// ./functions/twitch_clientwhisper.js
// ========

parent = require.main.exports;

module.exports = {
	name: "twitch_clientwhisper",
	version_added: "2.1",
    module_type: "single",
    invocation: (whisper_user, to_say) => {
        parent.debug ? console.log(`Sending twitch whisper to: ${whisper_user} -> ${to_say}`) : ""
        parent.handlers.twitch_handler.get_client().whisper(whisper_user, to_say).then(function (data) {
            return true;
        }).catch(function (err) {
            console.error(`[Error] Could not send message in twitch whispers: ${err}`)
            // TODO send_paul_telegram(`[ERROR]`, `Failed to send message in chat`, `${err}`);
            return false;
        });
    }
}