// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../utilities/data.js");

module.exports = {
    name: "servers",
    description: "owner command to check data on the servers the bot is currently in",
    execute(bot, msg) {
        // react to command
        msg.react(bot.emojis.cache.get(Data.emojiIds.kiwi));
        
        // allow usage only if user is the owner
        if (msg.author.id === Data.ownerId) {
            let servers = bot.guilds.cache.array().sort();
            let pageCount = Math.floor(servers.length / 20) + 1;
            let memberCount = 0;

            servers.forEach(
                function(server) {
                    memberCount += server.memberCount;
                }
            );

            msg.channel.send(module.exports.generatePage(bot, servers, memberCount, 1, pageCount)).then(
                function(sentMsg) {
                    let page = 1;
    
                    // generate reactions
                    sentMsg.react("⬅️");
                    sentMsg.react("➡️");
    
                    // reaction filters
                    const leftFilter = (reaction, user) => reaction.emoji.name === "⬅️" && user.id === msg.author.id;
                    const rightFilter = (reaction, user) => reaction.emoji.name === "➡️" && user.id === msg.author.id;
    
                    // collectors (parse for 60 seconds)
                    const leftCollector = sentMsg.createReactionCollector(leftFilter, {time: 60000});
                    const rightCollector = sentMsg.createReactionCollector(rightFilter, {time: 60000});
    
                    leftCollector.on("collect", 
                        function() {
                            sentMsg.reactions.cache.get("⬅️").users.remove(msg.author);
                            module.exports.resetTimer(leftCollector, rightCollector);
    
                            if (page !== 1) { 
                                page--;
                                sentMsg.edit(module.exports.generatePage(bot, servers, memberCount, page, pageCount));
                            } 
                        }
                    );
                    rightCollector.on("collect", 
                        function() {
                            sentMsg.reactions.cache.get("➡️").users.remove(msg.author);
                            module.exports.resetTimer(leftCollector, rightCollector);
    
                            if (page !== pageCount) {
                                page++;      
                                sentMsg.edit(module.exports.generatePage(bot, servers, memberCount, page, pageCount));
                            } 
                        }
                    );
                }
            ).catch(err => console.log("Error adding reactions!" + err));

        } else {
            const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
            .setDescription(`You must be the bot owner, ${Data.ownerMention}, to use this command!`)
            .addField("\u200b", "\u200b")
            .setFooter(Data.footer.text, Data.footer.image);

            msg.channel.send(embed);
        }
    },
    resetTimer(left, right) {
        left.resetTimer({time: 60000});
        right.resetTimer({time: 60000});
    },
    generatePage(bot, servers, memberCount, page, pageCount) {
        let start = (page - 1) * 20;
        
        if (start <= servers.length) {
            let serverList = "";
            let dataList = "";
            let idList = "";
            let date = new Date();

            let i;
            for (i = start; (i < start + 20 && i < servers.length); i++) {
                joinDate = servers[i].joinedAt;
                
                serverList += `\n**${i + 1}.** ${servers[i].name}`;
                if (joinDate.toDateString() === date.toDateString())
                    serverList += "🆕";

                dataList += `\n${joinDate.toDateString()}`;
                idList += `\n${servers[i].id}`
            }

            let embed = new Discord.MessageEmbed()
                .setColor("#D5AB88")
                .setTitle(":notebook_with_decorative_cover: **━━━━━━ BOT SERVER DATA ━━━━━━** :notebook_with_decorative_cover:")
                .setDescription(`Logged in as **${bot.user.tag}**!`
                            + `\n\nHelping **${memberCount}** members`
                            + `\nIn **${bot.guilds.cache.size}** server(s):`)
                .addField("\u200b", `${serverList}`, true)
                .addField("\u200b", `${dataList}`, true)
                .addField("\u200b", `${idList}`, true)
                .addField("\u200b", `page **${page}** of **${pageCount}**`)
                .addField("\u200b", "\u200b")
                .setFooter(Data.footer.text, Data.footer.image);

            return embed;

        } else {
            let embed = new Discord.MessageEmbed()
                .setColor("#D5AB88")
                .setTitle(":notebook_with_decorative_cover: **━━━━━━ BOT SERVER DATA ━━━━━━** :notebook_with_decorative_cover:")
                .setDescription(`Logged in as **${bot.user.tag}**!`
                            + `\n\nHelping **${memberCount}** members`
                            + `\nIn **${bot.guilds.cache.size}** server(s):`)
                .addField("\u200b", "empty page")
                .addField("\u200b", `page **${page}** of **${pageCount}**`)
                .addField("\u200b", "\u200b")
                .setFooter(Data.footer.text, Data.footer.image);

            return embed;
        }
    }
}