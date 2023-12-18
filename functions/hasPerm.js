// ./functions/hasPerm.js
// ========
// checks if user has the permission:

var parent = require.main.exports;

module.exports = {
	name: "hasPerm",
	version_added: "2.0",
	module_type: "single",
	invocation: (channel, username_or_id, perm, send_missing_perm_message, platform=null, message = null) => {

		if (platform === null){
			platform = "twitch"
			console.log(`[WARN] No platform specified when testing perm for: ${perm}`);
		}

		switch (platform) {
			case "twitch_whisper":
			case "twitch":
				if (username_or_id.toLowerCase() === process.env.TWITCH_USERNAME_OWNER) {
					return true;
				}

				if (platform === "twitch"){
					parent.functions.twitch_clientsay(channel, `[PERM] You do not have permissions for that @${username_or_id}`);
				}
				parent.debug ? console.log(`Failed permission check: ${username_or_id} in ${channel}`) : "";
				return false

			case "discord":
				if (username_or_id === process.env.DISCORD_USERID) {
					return true
				}
				parent.functions.discord_clientsay(message, `you do not have permissions for that!`, true)
				parent.debug ? console.log(`{DISCORD} Failed permission check: ${username_or_id} in ${channel.id}`) : ""
				return false
		
			default:
				return false;
		}

		return false
		// splits perm into levels eg. 
		var perm_contents = perm.split(".");
		var username_or_id = username_or_id.toLowerCase();

		// check if everyone has this permission
		for (let index = 0; index < perm_contents.length; index++) {
			if (parent.hannahbot_storage.permissions["everyone"].includes(perm_contents.joinIndex(".", 0, index) + ".*")) {
				return true;
			}
		}

		// check if this user has any perms
		if (parent.hannahbot_storage.permissions.hasOwnProperty(username_or_id)) {
			// check if this user has this permission
			for (let index = 0; index < perm_contents.length; index++) {
				if (parent.hannahbot_storage.permissions[username_or_id].includes(perm_contents.joinIndex(".", 0, index) + ".*")) {
					return true;
				}
			}
		}

		if (send_missing_perm_message === true) {
			parent.functions.clientsay(channel, `[INFO] Sorry! You do not have permissions for that, @${username_or_id}`);
		}
		return false;
	}
}