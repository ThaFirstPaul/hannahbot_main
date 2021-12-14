// ./functions/send_telegram.js
// ========
// sends a telegram to the specified person

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
    name: "send_telegram",
    version_added: "2.0",
    module_type: "single",
    invocation: async (chat_id, telegram_message) => {
        var telegram_url = "https://api.telegram.org/bot2035636001:AAESbaxwT0z8XvcTiatyQfHfszOnshKM-Fk/sendMessage"

        var xhr = new XMLHttpRequest();
        xhr.open("POST", telegram_url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            chat_id: chat_id,
            text: telegram_message
        }));
    }
}