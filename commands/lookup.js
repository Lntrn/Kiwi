// require discord.js module
const Discord = require("discord.js");
// require talent database
const Talents = require("../utilities/talents.js");
// require emojis.js module
const Emojis = require("../utilities/emojis.js");
// require format.js module
const Format = require("../utilities/format.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "lookup",
    description: "query the talent database",
    execute(bot, msg, args) {
        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));

        // provided order

        // provided name

        // provided school

        // provided rank

        // provided flag

        // let talent = Talent.find()

        const info = new Discord.MessageEmbed()
            .setColor("#83BEEC")
            .setTitle(`🔍 **━━━━━━ TALENT LOOKUP ━━━━━━** 🔍`)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                        + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
            .setFooter(Format.footer.text, Format.footer.image);

        //msg.channel.send(info).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "pool", err));

        // log command use
        //Mongo.logCMD(bot, msg, msg.guild.id, "pool");
    }
}