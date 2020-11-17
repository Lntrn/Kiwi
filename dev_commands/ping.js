// require discord.js module
const Discord = require("discord.js");
// require emojis.js module
const Emojis = require("../utilities/emojis.js");
// require format.js module
const Format = require("../utilities/format.js");
// require channels.js module
const Channels = require("../utilities/channels.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "ping",
    description: "owner command to check bot's ping",
    execute(bot, msg) {
        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));
        
        const yourPing = new Date().getTime() - msg.createdTimestamp;
        const botPing = Math.round(bot.ws.ping);

        const embed = new Discord.MessageEmbed()
            .setColor("#CCD6DD")
            .setTitle(":satellite: **━━━ BOT PING ━━━** :satellite:")
            .setDescription(`**Your Ping:** ${yourPing}ms`
                            + `\n**Bot's Ping:** ${botPing}ms`)
            .addField("\u200b", "\u200b")
            .setFooter(Format.footer.text, Format.footer.image);

        bot.channels.cache.get(Channels.devCmds.id).send(embed).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "ping", err));
    }
}