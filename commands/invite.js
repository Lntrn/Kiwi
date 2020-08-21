// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../data.js");
// require cmds.js module
const CMDS = require("./cmds.js");

module.exports = {
    name: "invite",
    description: "submit a suggestion for Kiwi",
    execute(bot, msg) {
        const invite = new Discord.MessageEmbed()
            .setColor("#CCD6DD")
            .setTitle(`:envelope:${Data.space(1)} **━━━━━━ INVITE KIWI ━━━━━━** ${Data.space(1)}:envelope:`)
            .setDescription(`*Like what ya see?*`
                            + `\nHere's a link to invite Kiwi to **your server**!`
                            + `\n\n[**Invite Me!**](${Data.inviteLink}) ${Data.emojis.kiwi}`)
            .addField("\u200b", "\u200b")
            .setFooter(Data.footer.footer, Data.footer.image);
        
        msg.channel.send(invite);

        // update count of invite cmd uses
        // CMDS.updateData(bot, msg.author, msg.guild.id, "invite");
        CMDS.cmdLog(bot, msg.author, msg.guild.id, "invite");
    }
}