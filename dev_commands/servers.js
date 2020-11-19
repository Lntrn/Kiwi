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
    name: "servers",
    description: "owner command to check data on the servers the bot is currently in",
    async execute(bot, msg) {
        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));
        
        let servers = bot.guilds.cache.array().sort();
        let pageCount = Math.floor(servers.length / 20) + 1;
        let memberCount = Format.memberCount(bot);

        try {
            const sentMsg = await bot.channels.cache.get(Channels.devCmds.id).send(generatePage(bot, servers, memberCount, 1, pageCount));
            
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
                    resetTimer(leftCollector, rightCollector);

                    if (page !== 1) { 
                        page--;
                        sentMsg.edit(generatePage(bot, servers, memberCount, page, pageCount));
                    } 
                }
            );
            
            rightCollector.on("collect", 
                function() {
                    sentMsg.reactions.cache.get("➡️").users.remove(msg.author);
                    resetTimer(leftCollector, rightCollector);

                    if (page !== pageCount) {
                        page++;      
                        sentMsg.edit(generatePage(bot, servers, memberCount, page, pageCount));
                    } 
                }
            );

            // edit message when reaction collectors expire
            rightCollector.on("end", 
                function() {
                    sentMsg.edit(Format.expirationNotice, generatePage(bot, servers, memberCount, page, pageCount));
                }
            );

        } catch (err) {
            ErrorLog.log(bot, msg, msg.guild.id, "servers", err);
        }
    }
}

function resetTimer(left, right) {
    left.resetTimer({time: 60000});
    right.resetTimer({time: 60000});
}

function generatePage(bot, servers, memberCount, page, pageCount) {
    let start = (page - 1) * 20;
    
    if (start <= servers.length - 1) {
        let serverList = "";
        let dataList = "";
        let idList = "";
        let date = new Date();

        let i;
        for (i = start; (i < start + 20 && i < servers.length); i++) {
            joinDate = servers[i].joinedAt;
            
            serverList += `\n**${i + 1}.** ${servers[i].name}`;
            if (joinDate.toDateString() === date.toDateString())
                serverList += " 🆕";

            dataList += `\n${joinDate.toDateString()}`;
            idList += `\n${servers[i].id}`
        }

        let embed = new Discord.MessageEmbed()
            .setColor("#D5AB88")
            .setTitle(":notebook_with_decorative_cover: **━━━━━━━━ BOT SERVER DATA ━━━━━━━━** :notebook_with_decorative_cover:")
            .setDescription(`Logged in as **${bot.user.tag}**!`
                        + `\n\nHelping **${memberCount}** members`
                        + `\nIn **${bot.guilds.cache.size}** server(s):`)
            .addField("NAME", `${serverList}`, true)
            .addField("DATE ADDED", `${dataList}`, true)
            .addField("ID", `${idList}`, true)
            .addField("\u200b", `page **${page}** of **${pageCount}**`)
            .addField("\u200b", "\u200b")
            .setFooter(Format.footer.text, Format.footer.image);

        return embed;

    } else {
        let embed = new Discord.MessageEmbed()
            .setColor("#D5AB88")
            .setTitle(":notebook_with_decorative_cover: **━━━━━━━━ BOT SERVER DATA ━━━━━━━━** :notebook_with_decorative_cover:")
            .setDescription(`Logged in as **${bot.user.tag}**!`
                        + `\n\nHelping **${memberCount}** members`
                        + `\nIn **${bot.guilds.cache.size}** server(s):`)
            .addField("\u200b", "empty page")
            .addField("\u200b", `page **${page}** of **${pageCount}**`)
            .addField("\u200b", "\u200b")
            .setFooter(Format.footer.text, Format.footer.image);

        return embed;
    }
}