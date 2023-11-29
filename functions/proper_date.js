// ./functions/proper_date.js
// ========
// returns a dhms time from a given ms

const prettyMilliseconds = require('pretty-ms');

module.exports = {
	name: "proper_date",
	version_added: "2.0",
    module_type: "single",
    invocation: (time_in_ms) => {
        try {
            return prettyMilliseconds(time_in_ms, { unitCount: 2 });
        } catch {
            return NaN;
        }
    }
}