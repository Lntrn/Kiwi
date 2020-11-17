// require discord.js module
const Discord = require("discord.js");
// require emojis.js module
const Emojis = require("../utilities/emojis.js");
// require format.js module
const Format = require("../utilities/format.js");
// require channels.js module
const Channels = require("../utilities/channels.js");
// require mongo.js module
const Mongo = require("../utilities/mongo.js");
// require roles.js module
const Roles = require("../utilities/roles.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "suggest",
    description: "submit a suggestion for Kiwi",
    execute(bot, msg, args) {
        let date = new Date();

        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));

        const suggestion = new Discord.MessageEmbed()
            .setColor("#FFD983")
            .setTitle(`:bulb:${Format.space(1)} **━━━━━━━━ SUGGESTION ━━━━━━━━** ${Format.space(1)}:bulb:`)
            .setDescription(`**Sent By:** ${msg.author}
                            **Date:** ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}
                            **Time:** ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
                            **Server:** "${msg.guild.name}" (ID: ${msg.guild.id})
                            \n**Suggestion:** ${args.join(" ")}`);

        bot.channels.cache.get(Channels.suggestion.id).send(suggestion).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "suggest [sending report]", err));
        bot.channels.cache.get(Channels.suggestion.id).send(Roles.dev.pub).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "suggest [notifying dev]", err));

        const response = new Discord.MessageEmbed()
                .setColor("#FFD983")
                .setTitle(`:bulb:${Format.space(1)} **━━━━━━━━ SUGGESTION ━━━━━━━━** ${Format.space(1)}:bulb:`)
                .setDescription(`*Thank you for contributing to improving Kiwi!* ${Format.space(1)}${Emojis.kiwi.pub}`
                                + `\n\n**Suggestion:**`
                                + `\n${args.join(" ")}`
                                + `\n\n\n:white_check_mark: **Sucessfully Submitted to [Support Server](${Format.supportLink})!**`)
                .addField("\u200b", "\u200b")
                .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                            + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
                .setFooter(Format.footer.text, Format.footer.image);

        msg.channel.send(response).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "suggest [submission reply]", err));

        // log command use
        Mongo.logCMD(bot, msg, msg.guild.id, "suggestion");
    }
}