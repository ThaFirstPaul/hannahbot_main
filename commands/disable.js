// ./commands/disable.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb disable",
    version_added: "2.2",
    commands_regex: "disable|stop",
    supported_platforms: ["twitch", "discord", "telegram", "web"],
    invocation: async (platform, channel, tags, message) => {

        switch (platform) {
            case "twitch":
                if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.admin", true, platform="twitch")) { return; }
                parent.functions.twitch_clientsay(channel, `[ADMIN] I have been globally disabled. `);
                parent.vars.bot_enabled = false;
                parent.functions.save_hannahbot_storage();
                return

            case "discord":
                // (channel, username_or_id, perm, send_missing_perm_message, platform = "twitch", message = null)
                if (!parent.functions.hasPerm(channel, user, "hhb.admin", false, platform="discord")) { return; }
                parent.vars.bot_enabled = false;
                parent.functions.save_hannahbot_storage();
                return

            case "telegram":
                if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.admin", false)) { return; }
                parent.vars.bot_enabled = false;
                parent.functions.save_hannahbot_storage();

                return

            case "web":
                if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.admin", false)) { return; }
                parent.vars.bot_enabled = false;
                parent.functions.save_hannahbot_storage();

                return

            default:
                break;
        }



    }
}