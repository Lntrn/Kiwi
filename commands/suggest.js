// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../utilities/data.js");
// require mongo.js module
const Mongo = require("../utilities/mongo.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "suggest",
    description: "submit a suggestion for Kiwi",
    execute(bot, msg, args) {
        let date = new Date();

        // react to command
        msg.react(bot.emojis.cache.get(Data.emojiIds.kiwi));

        const suggestion = new Discord.MessageEmbed()
            .setColor("#FFD983")
            .setTitle(`:bulb:${Data.space(1)} **━━━━━━━━ SUGGESTION ━━━━━━━━** ${Data.space(1)}:bulb:`)
            .setDescription(`**Sent By:** ${msg.author}
                            **Date:** ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}
                            **Time:** ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
                            **Server:** "${msg.guild.name}" (ID: ${msg.guild.id})
                            \n**Suggestion:** ${args.join(" ")}`);

        bot.channels.cache.get(Data.suggestionId).send(suggestion).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "suggest [sending report]", err));
        bot.channels.cache.get(Data.suggestionId).send(Data.devReportRole).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "suggest [notifying dev]", err));

        const response = new Discord.MessageEmbed()
                .setColor("#FFD983")
                .setTitle(`:bulb:${Data.space(1)} **━━━━━━━━ SUGGESTION ━━━━━━━━** ${Data.space(1)}:bulb:`)
                .setDescription(`*Thank you for contributing to improving Kiwi!* ${Data.space(1)}${Data.emojis.kiwi}`
                                + `\n\n**Suggestion:**`
                                + `\n${args.join(" ")}`
                                + `\n\n\n:white_check_mark: **Sucessfully Submitted to [Support Server](${Data.supportLink})!**`)
                .addField("\u200b", "\u200b")
                .addField("Like what you see?", `[**${Data.bot.text}**](${Data.bot.invite}) ${Data.emojis.kiwi}`
                                            + `\n[**${Data.server.text}**](${Data.server.link}) ${Data.emojis.spiralscholars}`)
                .setFooter(Data.footer.text, Data.footer.image);

        msg.channel.send(response).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "suggest [submission reply]", err));

        // log command use
        Mongo.logCMD(bot, msg, msg.guild.id, "suggestion");
    }
}