// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../utilities/data.js");


// require error logger module
//const ErrorLog = require("../utilities/error.js");
// ErrorLog.log(bot, msg, msg.guild.id, "CMD", err);

module.exports = {
    name: "error",
    description: "sends errors that Kiwi encounters to a logging channel",
    log(bot, msg, serverID, cmd, error) {
        date = new Date();

        const log = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
            .setDescription(`**Command Used:** ${cmd}`
                            + `\n**User:** ${msg.author}`
                            + `\n**Server:** ${bot.guilds.cache.get(serverID).name}`
                            + `\n**Channel:** ${msg.channel}`
                            + `\n**Date:** ${date.toDateString()}`
                            + `\n\n**Error:**`
                            + `\n${error}`)
            .setFooter(Data.footer.text, Data.footer.image);

        bot.channels.cache.get(Data.errorLog).send(log);
        bot.channels.cache.get(Data.errorLog).send(Data.devReportRole);
    }
}