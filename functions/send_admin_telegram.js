// ./functions/send_admin_telegram.js
// ========
// sends a telegram to the specified person

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
    name: "send_admin_telegram",
    version_added: "2.0",
    module_type: "single",
    invocation: async (type, info, message) => {
        var telegram_url = `https://api.telegram.org/${process.env.TELEGRAM_ADMINBOT_AUTH}/sendMessage`
    
        var xhr = new XMLHttpRequest();
        xhr.open("POST", telegram_url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            chat_id: 1952753505,
            text: `*\[${type}\]* _${info}_ : ${message}`
        }));
    }
}