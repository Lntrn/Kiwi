// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../data.js");

module.exports = {
    name: "suggestion",
    description: "submit a suggestion for Kiwi",
    execute(bot, msg, args) {
        let date = new Date();

        const suggestion = new Discord.MessageEmbed()
            .setColor("#FFD983")
            .setTitle(`:bulb:${Data.space(1)} **━━━━━━━━ SUGGESTION ━━━━━━━━** ${Data.space(1)}:bulb:`)
            .setDescription(`**Sent By:** ${msg.author}
                            **Date:** ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}
                            **Time:** ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
                            **Server:** "${msg.guild.name}" (ID: ${msg.guild.id})
                            \n**Suggestion:** ${args.join(" ")}`);

        bot.channels.cache.get(Data.suggestionId).send(suggestion);
        bot.channels.cache.get(Data.suggestionId).send(Data.bugReportRole);

        const response = new Discord.MessageEmbed()
                .setColor("#FFD983")
                .setTitle(`:bulb:${Data.space(1)} **━━━━━━━━ SUGGESTION ━━━━━━━━** ${Data.space(1)}:bulb:`)
                .setDescription(`*Thank you for contributing to improving Kiwi!* ${Data.space(1)}${Data.emojis.kiwi}
                                \n**Suggestion:**
                                ${args.join(" ")}
                                \n\n:white_check_mark: **Sucessfully Submitted!**`)
                .addField("\u200b", "\u200b")
                .setFooter(Data.footer.footer, Data.footer.image);

        msg.channel.send(response);
    }
}