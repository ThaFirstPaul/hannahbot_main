// ./functions/get_hannahbot_storage.js
// ========
// returns a desired obj from hannahbot_storage

var parent = require.main.exports;

module.exports = {
    name: "get_hannahbot_storage",
    version_added: "2.0",
    module_type: "single",
    invocation: (object_needed) => {
        return parent.hannahbot_storage[object_needed];
    }
}
