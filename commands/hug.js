// ./commands/hhb hug.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb hug",
    version_added: "2.0",
    commands_regex: "hug.*( |$)",
    supported_platforms: ["twitch", "discord"],
    invocation: async (platform, channel, tags, message) => {

        if (platform === "twitch") {
            //if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.compliment", true)) { return; }
            var command_args = message.split(/[\s]+/);

            if (command_args.length < 3) {

                parent.functions.twitch_clientsay(channel, ` @${tags.username} ` + random_hug_emote());

            } else {
                if (command_args[2].toLowerCase() === "hannah_yee5") {
                    parent.functions.twitch_clientsay(channel, ` @${tags.username}, i'm not allowed to hug myself FeelsBadMan  `);
                    return;
                }
                parent.functions.twitch_clientsay(channel, ` @${command_args[2].replace("@", "")} ` + random_hug_emote());
            }

            return

        } else if (platform === "discord") {
            //if (!parent.functions.hasPerm(channel, tags.author.id, "hhb.compliment", true, "discord",tags)) { return; }
            var command_args = message.split(/[\s]+/);

            if (command_args.length < 3) {
                parent.functions.discord_clientsay(tags, random_hug_emote(), true);

            } else {
                parent.functions.discord_clientsay(tags, `${command_args[2]} ` + random_hug_emote(), false);

            }
            return
        }
    }
}

function random_hug_emote(){
    var hugs = ["🤗", `(>^-^)> `]

    return hugs[Math.floor(Math.random()*hugs.length)];

}