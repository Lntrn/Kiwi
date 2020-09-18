// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../utilities/data.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "guildUpdate",
    description: "notifications for name changes for servers using Kiwi",
    execute(bot, oldGuild, newGuild) {
        date = new Date();

        const log = new Discord.MessageEmbed()
            .setColor("#FFD983")
            .setTitle(":label: **━━━━━ SERVER NAME CHANGE ━━━━━** :label:")
            .setDescription(`\n**Old Name:** ${oldGuild.name}`
                            + `\n**New Name:** ${newGuild.name}`
                            + `\n**Date:** ${date.toDateString()}`)
            .setFooter(Data.footer.text, Data.footer.image);

        bot.channels.cache.get(Data.devCmds).send(log).catch(err => ErrorLog.log(bot, msg, msg.guild.id, `guildUpdate [${oldGuild}, ${newGuild}]`, err));
    }
}