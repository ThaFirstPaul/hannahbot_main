// ./commands/getJSON.js
// ========
// returns json retrieved from a url via callback

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
	name: "getJSON",
	version_added: "2.0",
	module_type: "single",
	invocation: (url, post_vars, callback, get_post='POST', type='application/json') => {
		var xhr = new XMLHttpRequest();
		xhr.open(get_post, url, true);
		xhr.setRequestHeader('Content-Type', type);
		xhr.responseType = 'json';
		xhr.onload = function () {
			var status = xhr.status;
			if (status === 200) {
				callback(null, JSON.parse(xhr.responseText));
			} else {
				callback(status, JSON.parse(xhr.responseText));
			}
		};
		xhr.send(post_vars);
	}
}