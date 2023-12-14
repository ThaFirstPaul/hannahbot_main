// ./commands/changecolor.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb changenick",
    version_added: "2.0",
    commands_regex: "(change|)nick(name|)",
    usage: "changenick {nickname}",
    supported_platforms: ["discord"],
    invocation: async (platform, channel, tags, message) => {

        switch (platform) {
            case "twitch":

                return

            case "discord":
                //if (!parent.functions.hasPerm(channel, tags.author.username.toLowerCase(), "hhb.admin.changecolor", true, "discord", tags)) { return; }
                const command_args = message.split(/[\s]+/);

                if (command_args.length < 3) {
                    parent.functions.discord_clientsay(tags, `please supply a nickname!`, true)
                    return
                }

                tags.channel.guild.me.setNickname(command_args[2]).then(() => {
                    parent.functions.discord_clientsay(tags, `my nickname is set!`, true)
                    parent.debug ? console.log(`{DISCORD} Set nickname to: ${command_args[2]}`) : ""
                }
                ).catch((error) => {
                    parent.functions.discord_clientsay(tags, `I could not set my nickname.`, true)
                    console.log(`{DISCORD} Could not set nick: ${error}`)
                })


                return

            case "telegram":

                return

            case "web":

                return

            default:
                break;
        }



    }
}