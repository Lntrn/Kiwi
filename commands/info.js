// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../data.js");
// require cmds.js module
const CMDS = require("./cmds.js");

module.exports = {
    name: "info",
    description: "owner command to check the number of servers the bot is currently in",
    execute(bot, msg) {
        // allow usage only if user is the owner
        if (msg.author.id === Data.ownerId) {
            let servers = bot.guilds.cache.array();
            let serverPrintout = "";

            servers.forEach(
                function(server) {
                    joinDate = server.joinedAt;
                    serverPrintout += `\n:white_small_square: **${server.name}** [${joinDate.toDateString()}]`
                }
            );
            
            const embed = new Discord.MessageEmbed()
                .setColor("#D5AB88")
                .setTitle(":notebook_with_decorative_cover: **━━━━━ BOT DATA ━━━━━** :notebook_with_decorative_cover:")
                .setDescription(`Logged in as **${bot.user.tag}**!`
                            + `\nUsed in **${bot.guilds.cache.size}** server(s):${serverPrintout}`)
                .addField("\u200b", "\u200b")
                .setFooter(Data.footer.footer, Data.footer.image);

            msg.channel.send(embed);

        } else {
            const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
            .setDescription(`You must be the bot owner, ${Data.ownerMention}, to use this command!`)
            .addField("\u200b", "\u200b")
            .setFooter(Data.footer.footer, Data.footer.image);

            msg.channel.send(embed);
        }
    }
}