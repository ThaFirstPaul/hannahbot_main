// ./commands/getText_from_url.js
// ========
// returns text retrieved from a url via callback

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
	name: "getText_from_url",
	version_added: "2.1",
	module_type: "single",
	invocation: (url, post_vars, callback, get_post='GET', type='application/text') => {
		var xhr = new XMLHttpRequest();
		xhr.open(get_post, url, true);
		xhr.setRequestHeader('Content-Type', type);
		xhr.responseType = 'text';
		xhr.onload = function () {
			var status = xhr.status;
			if (status === 200) {
				callback(null, xhr.responseText);
			} else {
				callback(status, xhr.responseText);
			}
		};
		xhr.send(post_vars);
	}
}