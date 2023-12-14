// ./functions/save_hannahbot_storage.js
// ========
// saves the obj hannahbot_storage to file

const fs = require("fs");

var parent = require.main.exports;

module.exports = {
    name: "save_hannahbot_storage",
    version_added: "2.0",
	module_type: "single",
    invocation: () => { // TODO make async or promise
        if (process.argv.includes("--storage-readonly")) {
            if (parent.debug) console.log("Saving hannahbot-storage cancelled as it is read-only.")
            return false
        }

        if (fs.writeFileSync('./hannahbot_storage.json',
            JSON.stringify(parent.hannahbot_storage), 'utf-8')) {
            return true
        } else {
            return false
        }
    }
}
