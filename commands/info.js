// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../utilities/data.js");

module.exports = {
    name: "info",
    description: "owner command to check the number of servers the bot is currently in",
    execute(bot, msg) {
        // react to command
        msg.react(bot.emojis.cache.get(Data.emojiIds.kiwi));
        
        // allow usage only if user is the owner
        if (msg.author.id === Data.ownerId) {
            let servers = bot.guilds.cache.array().sort();
            let serverPrintout = "";
            let memberCount = 0;

            servers.forEach(
                function(server) {
                    joinDate = server.joinedAt;
                    date = new Date();

                    serverPrintout += `\n:white_small_square: **${server.name}** [${joinDate.toDateString()}]`;
                    memberCount += server.memberCount;

                    if (joinDate.toDateString() === date.toDateString())
                        serverPrintout += "🚩";
                }
            );
            
            const embed = new Discord.MessageEmbed()
                .setColor("#D5AB88")
                .setTitle(":notebook_with_decorative_cover: **━━━━━ BOT DATA ━━━━━** :notebook_with_decorative_cover:")
                .setDescription(`Logged in as **${bot.user.tag}**!`
                            + `\n\nHelping **${memberCount}** members`
                            + `\nIn **${bot.guilds.cache.size}** server(s):${serverPrintout}`)
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