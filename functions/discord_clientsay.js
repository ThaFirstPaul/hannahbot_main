// ./functions/discord_clientsay.js
// ========

parent = require.main.exports;

module.exports = {
    name: "discord_clientsay",
    version_added: "2.0",
    module_type: "single",
    invocation: (message_tags, to_say, as_reply = false) => {
        parent.debug ? console.log(`{DISCORD} Sending message in discord channel: ${message_tags.channel} -> ${to_say}`) : ""

        if (as_reply === false) {
            message_tags.channel.send({content: to_say}).then(function (data) {
                return true;
            }).catch(function (err) {
                console.error(`{DISCORD} [Error] Could not send message in discord chat: ${err}`)
                // TODO send_paul_telegram(`[ERROR]`, `Failed to send message in chat`, `${err}`);
                return false;
            });

        } else {
            message_tags.reply({content: to_say}).then(function (data) {
                return true;
            }).catch(function (err) {
                console.error(`{DISCORD} [Error] Could not reply message in discord chat: ${err}`)
                // TODO send_paul_telegram(`[ERROR]`, `Failed to reply message in chat`, `${err}`);
                return false;
            });
        }
    }
}