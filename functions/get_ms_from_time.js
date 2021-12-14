// ./functions/get_ms_from_time.js
// ========
// returns a random hex color

module.exports = {
    name: "get_ms_from_time",
    version_added: "2.0",
    module_type: "single",
    invocation: (time_unspecified) => {
        // var time_num = time_unspecified.split(/([^0-9]+|[^a-zA-Z]+)/)[1];
        // var time_type = time_unspecified.split(/([^0-9]+|[^a-zA-Z]+)/)[3];
    
        var time_num = parseInt(time_unspecified.split(/(\d+)/)[1]);
        var time_type = time_unspecified.split(/(\d+)/)[2].trim();
    
        if ((/^(s|secs?|seconds?)/).test(time_type)) {
            return time_num * 1000;
        } else if ((/^(m|mins?|minutes?)/).test(time_type)) {
            return time_num * 60000;
        } else if ((/^(h|hours?)/).test(time_type)) {
            return time_num * 3600000;
        } else if ((/^(d|days?)/).test(time_type)) {
            return time_num * 86400000;
        }
        return NaN;
    }
}