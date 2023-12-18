// ./functions/set_bot_state.js
// ========
// sets the enable/disable state of hannahbot

const fs = require("fs");

var parent = require.main.exports;

module.exports = {
    name: "set_bot_state",
    version_added: "2.3",
	module_type: "single",
    invocation: (state_to_change_to) => { // TODO make async or promise
        switch (state_to_change_to) {
            case "enabled":
            case "enable":
                parent.hannahbot_storage.vars.bot_enabled = true;
                parent.functions.save_hannahbot_storage();
                return true;
            
            case "disabled":
            case "disable":
                parent.hannahbot_storage.vars.bot_enabled = false;
                parent.functions.save_hannahbot_storage();
                return true;

            default:
                break;
        }
        
    }
}
