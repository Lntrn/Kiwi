// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../utilities/data.js");

module.exports = {
    name: "ping",
    description: "owner command to check bot's ping",
    execute(bot, msg) {
        // react to command
        msg.react(bot.emojis.cache.get(Data.emojiIds.kiwi));
        
        // allow usage only if user is the owner
        if (msg.author.id === Data.ownerId) {
            const yourPing = new Date().getTime() - msg.createdTimestamp;
            const botPing = Math.round(bot.ws.ping);

            const embed = new Discord.MessageEmbed()
                .setColor("#CCD6DD")
                .setTitle(":satellite: **━━━ BOT PING ━━━** :satellite:")
                .setDescription(`**Your Ping:** ${yourPing}ms`
                                + `\n**Bot's Ping:** ${botPing}ms`)
                .addField("\u200b", "\u200b")
                .setFooter(Data.footer.text, Data.footer.image);

            msg.channel.send(embed);

        } else {
            const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
            .setDescription(`You must be the bot owner, ${Data.ownerMention}, to use this command!`)
            .addField("\u200b", "\u200b")
            .setFooter(Data.footer.text, Data.footer.image);

            msg.channel.send(embed);
        }
    }
}