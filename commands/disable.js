// ./commands/disable.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb disable",
    description: "Disables Hannahbot, who will then ignore all commands and stop all actions (eg. reminders). Admins can re-enable with !hhb enable.",
    version_added: "2.2",
    commands_regex: "disable|stop|halt",
    usage: "disable",
    supported_platforms: ["twitch", "twitch_whisper", "discord", "telegram", "web"],
    invocation: async (platform, channel, tags, message) => {

        switch (platform) {
            case "twitch":
                if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.admin", true, platform="twitch")) { return; }
                
                dis_ = parent.functions.set_bot_state("disable");
                if (!dis_) {
                    parent.functions.twitch_clientsay(channel, `[ADMIN] Failed to disable hannahbot! `);
                    return
                } 
                
                parent.functions.twitch_clientsay(channel, `[ADMIN] I have been globally disabled. `);
                
                return

            case "twitch_whisper":
                if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.admin", false, platform="twitch_whisper")) { return; }
                parent.functions.twitch_clientsay(process.env.TWITCH_USERNAME_1, `[ADMIN] I have been globally disabled. `);
                parent.hannahbot_storage.vars.bot_enabled = false;
                parent.functions.save_hannahbot_storage();
                return

            case "discord":
                // (channel, username_or_id, perm, send_missing_perm_message, platform = "twitch", message = null)
                if (!parent.functions.hasPerm(channel, user, "hhb.admin", false, platform="discord")) { return; }
                parent.hannahbot_storage.vars.bot_enabled = false;
                parent.functions.save_hannahbot_storage();
                return

            case "telegram":
                if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.admin", false)) { return; }
                parent.hannahbot_storage.vars.bot_enabled = false;
                parent.functions.save_hannahbot_storage();

                return

            case "web":
                if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.admin", false)) { return; }
                parent.hannahbot_storage.vars.bot_enabled = false;
                parent.functions.save_hannahbot_storage();

                return

            default:
                break;
        }



    }
}