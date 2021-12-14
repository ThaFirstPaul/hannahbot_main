// ./functions/hasPerm.js
// ========
// checks if user has the permission:

var parent = require.main.exports;

module.exports = {
	name: "hasPerm",
	version_added: "2.0",
    module_type: "single",
	invocation: (channel, username, perm, send_missing_perm_message, platform="twitch") => {
		if(username.toLowerCase()=== "paulitio") {
			return true
		 } else {
			parent.functions.twitch_clientsay(channel, `[PERM] You do not have permissions for that @${username}`) 
		 } 
		return false
		// splits perm into levels eg. 
		var perm_contents = perm.split(".");
		var username = username.toLowerCase();

		// check if everyone has this permission
		for (let index = 0; index < perm_contents.length; index++) {
			if (parent.hannahbot_storage.permissions["everyone"].includes(perm_contents.joinIndex(".", 0, index) + ".*")) {
				return true;
			}
		}

		// check if this user has any perms
		if (parent.hannahbot_storage.permissions.hasOwnProperty(username)) {
			// check if this user has this permission
			for (let index = 0; index < perm_contents.length; index++) {
				if (parent.hannahbot_storage.permissions[username].includes(perm_contents.joinIndex(".", 0, index) + ".*")) {
					return true;
				}
			}
		}

		if (send_missing_perm_message === true) {
			parent.functions.clientsay(channel, `[INFO] Sorry! You do not have permissions for that, @${username}`);
		}
		return false;
	}
}