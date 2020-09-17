// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../utilities/data.js");

module.exports = {
    name: "guildDelete",
    description: "notifications for new servers using Kiwi",
    execute(bot, server) {
        date = new Date();

        const log = new Discord.MessageEmbed()
            .setColor("#5DADEC")
            .setTitle(":sob: **━━━━━ SERVER LEFT ━━━━━** :sob:")
            .setDescription(`\n**Server:** ${server}`
                            + `\n**Date:** ${date.toDateString()}`)
            .setFooter(Data.footer.text, Data.footer.image);

        bot.channels.cache.get(Data.devCmds).send(log);
    }
}