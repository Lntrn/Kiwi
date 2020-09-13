// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../utilities/data.js");
// require cmds.js module
const CMDS = require("./cmds.js");

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

        bot.channels.cache.get(Data.suggestionId).send(suggestion);
        bot.channels.cache.get(Data.suggestionId).send(Data.devReportRole);

        const response = new Discord.MessageEmbed()
                .setColor("#FFD983")
                .setTitle(`:bulb:${Data.space(1)} **━━━━━━━━ SUGGESTION ━━━━━━━━** ${Data.space(1)}:bulb:`)
                .setDescription(`*Thank you for contributing to improving Kiwi!* ${Data.space(1)}${Data.emojis.kiwi}`
                                + `\n\n**Suggestion:**`
                                + `\n${args.join(" ")}`
                                + `\n\n\n:white_check_mark: **Sucessfully Submitted to [Support Server](${Data.supportLink})!**`)
                .addField("\u200b", "\u200b")
                .addField("Like what you see?", `[**Invite Kiwi!**](${Data.inviteLink}) ${Data.emojis.kiwi}`
                                                + `\n[**Spiral Scholars**](${Data.server.link}) ${Data.emojis.spiralscholars}`)
                .setFooter(Data.footer.text, Data.footer.image);

        msg.channel.send(response);

        // update count of suggestion cmd uses
        // CMDS.updateData(bot, msg.author, msg.guild.id, "suggestion");
        CMDS.cmdLog(bot, msg, msg.guild.id, "suggestion");
    }
}