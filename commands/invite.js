// require discord.js module
const Discord = require("discord.js");
// require emojis.js module
const Emojis = require("../utilities/emojis.js");
// require format.js module
const Format = require("../utilities/format.js");
// require mongo.js module
const Mongo = require("../utilities/mongo.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "invite",
    description: "submit a suggestion for Kiwi",
    execute(bot, msg) {
        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));
        
        const invite = new Discord.MessageEmbed()
            .setColor("#CCD6DD")
            .setTitle(`:envelope:${Format.space(1)} **━━━━━━ INVITE KIWI ━━━━━━** ${Format.space(1)}:envelope:`)
            .setDescription(`*Like what ya see?*`
                            + `\nHere's a link to invite Kiwi to **your server**!`
                            + `\n\n[**Invite Me!**](${Format.bot.invite}) ${Emojis.kiwi.pub}`)
            .addField("\u200b", "\u200b")
            .addField("\u200b", `[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
            .setFooter(Format.footer.text, Format.footer.image);
        
        msg.channel.send(invite).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "invite", err));

        // log command use
        Mongo.logCMD(bot, msg, msg.guild.id, "invite");
    }
}