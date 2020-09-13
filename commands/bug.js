// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../utilities/data.js");
// require cmds.js module
const CMDS = require("./cmds.js");

module.exports = {
    name: "bug",
    description: "report a bug with Kiwi",
    execute(bot, msg, args) {
        let date = new Date();

        // react to command
        msg.react(bot.emojis.cache.get(Data.emojiIds.kiwi));

        const report = new Discord.MessageEmbed()
            .setColor("#8899A6")
            .setTitle(`:wrench:${Data.space(1)} **━━━━━━━━ BUG REPORT ━━━━━━━━** ${Data.space(1)}:wrench:`)
            .setDescription(`**Sent By:** ${msg.author}`
                            + `\n**Date:** ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
                            + `\n**Time:** ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                            + `\n**Server:** "${msg.guild.name}" (ID: ${msg.guild.id})`
                            + `\n\n**Report:** ${args.join(" ")}`);

        bot.channels.cache.get(Data.bugReportId).send(report);
        bot.channels.cache.get(Data.bugReportId).send(Data.devReportRole);

        const response = new Discord.MessageEmbed()
            .setColor("#8899A6")
            .setTitle(`:wrench:${Data.space(1)} **━━━━━━━━ BUG REPORT ━━━━━━━━** ${Data.space(1)}:wrench:`)
            .setDescription(`*Thank you for contributing to improving Kiwi!* ${Data.space(1)}${Data.emojis.kiwi}`
                            + `\n\n**Bug Report:**`
                            + `\n${args.join(" ")}`
                            + `\n\n\n:white_check_mark: **Sucessfully Submitted to [Support Server](${Data.supportLink})!**`)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**${Data.bot.text}**](${Data.bot.invite}) ${Data.emojis.kiwi}`
                                        + `\n[**${Data.server.text}**](${Data.server.link}) ${Data.emojis.spiralscholars}`)
            .setFooter(Data.footer.text, Data.footer.image);

        msg.channel.send(response);

        // update count of bug cmd uses
        // CMDS.updateData(bot, msg.author, msg.guild.id, "bug");
        CMDS.cmdLog(bot, msg, msg.guild.id, "bug");
    }
}