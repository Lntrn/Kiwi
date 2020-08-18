// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../data.js");

module.exports = {
    name: "invite",
    description: "submit a suggestion for Kiwi",
    execute(msg) {
        const invite = new Discord.MessageEmbed()
            .setColor("#C4DE61")
            .setTitle(`${Data.emojis.kiwi}${Data.space(1)} **━━━━━━ INVITE KIWI ━━━━━━** ${Data.space(1)}${Data.emojis.kiwi}`)
            .setDescription(`*Like what ya see?*
                            Here's a link to invite Kiwi to **your server**!
                            \n[**Invite Me!**](${Data.inviteLink})`)
            .addField("\u200b", "\u200b")
            .setFooter(Data.footer.footer, Data.footer.image);
        
        msg.channel.send(invite);
    }
}