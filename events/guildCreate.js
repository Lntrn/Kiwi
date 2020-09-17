// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../utilities/data.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "guildCreate",
    description: "notifications for new servers using Kiwi",
    execute(bot, guild) {
        date = new Date();

        const log = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":tada: **━━━━━ NEW SERVER ━━━━━** :tada:")
            .setDescription(`\n**Server:** ${guild}`
                            + `\n**Date:** ${date.toDateString()}`)
            .setFooter(Data.footer.text, Data.footer.image);

        bot.channels.cache.get(Data.devCmds).send(log).catch(err => ErrorLog.log(bot, msg, msg.guild.id, `guildCreate [${guild}]`, err));
    }
}