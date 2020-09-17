// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../utilities/data.js");
// require cmds.js module
const CMDS = require("./cmds.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "unrecognized",
    description: "default response if an unrecognized command is entered",
    execute(bot, msg, cmd) {
        // react to command
        msg.react(bot.emojis.cache.get(Data.emojiIds.kiwi));
        
        const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
            .setDescription(`Unrecognized command: **${cmd}**`
                            + `\n\nUse the **\`${Data.prefix}help\`** command for a list of Kiwi's commands`)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**${Data.bot.text}**](${Data.bot.invite}) ${Data.emojis.kiwi}`
                                        + `\n[**${Data.server.text}**](${Data.server.link}) ${Data.emojis.spiralscholars}`)
            .setFooter(Data.footer.text, Data.footer.image);

            msg.channel.send(embed).catch(err => ErrorLog.log(bot, msg, msg.guild.id, `unrecognized [${cmd}]`, err));

        // update count of unrecognized cmd uses
        // CMDS.updateData(bot, msg.author, msg.guild.id, "unrecognized");
        CMDS.cmdLog(bot, msg, msg.guild.id, `unrecognized: "${cmd}"`);
    }
}