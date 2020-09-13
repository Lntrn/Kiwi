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
            let pageCount = (servers.length / 20) + 1;
            let memberCount = 0;

            servers.forEach(
                function(server) {
                    memberCount += server.memberCount;
                }
            );

            msg.channel.send(module.exports.pageOne()).then(
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
                                sentMsg.edit(module.exports.generatePage(page));
                            } 
                        }
                    );
                    rightCollector.on("collect", 
                        function() {
                            sentMsg.reactions.cache.get("➡️").users.remove(msg.author);
                            module.exports.resetTimer(leftCollector, rightCollector);
    
                            if (page !== pageCount) {
                                page++;      
                                sentMsg.edit(module.exports.generatePage(page));                                               
                            } 
                        }
                    );
                }
            ).catch(err => console.log("Error adding reactions!" + err));
            
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
    },
    resetTimer(left, right) {
        left.resetTimer({time: 60000});
        right.resetTimer({time: 60000});
    },
    generatePage(servers, page) {
        let start = page * 20;
        
        if (start <= servers.length) {
            let printout = "";
            let date = new Date();

            let i;
            for (i = start; (i < start + 20 && i < servers.length); i++) {
                joinDate = servers[i].joinedAt;

                printout += `\n:white_small_square: **${server.name}** [${joinDate.toDateString()}]`;

                if (joinDate.toDateString() === date.toDateString())
                    printout += "🚩";
            }

            return printout;

        } else {
            return "empty page";
        }
    }
}