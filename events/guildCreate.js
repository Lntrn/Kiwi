// require discord.js module
const Discord = require("discord.js");
// require format.js module
const Format = require("../utilities/format.js");
// require channels.js module
const Channels = require("../utilities/channels.js");
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
                            + `\n**ID:** ${guild.id}`
                            + `\n**Date:** ${date.toDateString()}`)
            .setFooter(Format.footer.text, Format.footer.image);

        bot.channels.cache.get(Channels.devCmds.id).send(log).catch(err => ErrorLog.log(bot, msg, msg.guild.id, `guildCreate [${guild}]`, err));
    }
}