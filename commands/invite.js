// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../utilities/data.js");
// require cmds.js module
const CMDS = require("./cmds.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "invite",
    description: "submit a suggestion for Kiwi",
    execute(bot, msg) {
        // react to command
        msg.react(bot.emojis.cache.get(Data.emojiIds.kiwi));
        
        const invite = new Discord.MessageEmbed()
            .setColor("#CCD6DD")
            .setTitle(`:envelope:${Data.space(1)} **━━━━━━ INVITE KIWI ━━━━━━** ${Data.space(1)}:envelope:`)
            .setDescription(`*Like what ya see?*`
                            + `\nHere's a link to invite Kiwi to **your server**!`
                            + `\n\n[**Invite Me!**](${Data.bot.invite}) ${Data.emojis.kiwi}`)
            .addField("\u200b", "\u200b")
            .addField("\u200b", `[**${Data.server.text}**](${Data.server.link}) ${Data.emojis.spiralscholars}`)
            .setFooter(Data.footer.text, Data.footer.image);
        
        msg.channel.send(invite).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "invite", err));

        // update count of invite cmd uses
        // CMDS.updateData(bot, msg.author, msg.guild.id, "invite");
        CMDS.cmdLog(bot, msg, msg.guild.id, "invite");
    }
}