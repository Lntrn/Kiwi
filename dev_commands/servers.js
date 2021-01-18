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
            let page = 1;
            let info = "ID";

            const sentMsg = await bot.channels.cache.get(Channels.devCmds.id).send(generatePage(bot, servers, memberCount, page, pageCount, info));

            // generate reactions
            sentMsg.react("⬅️");
            sentMsg.react("➡️");
            sentMsg.react("📊");
            sentMsg.react("🆔");

            // reaction filters
            const leftFilter = (reaction, user) => reaction.emoji.name === "⬅️" && user.id === msg.author.id;
            const rightFilter = (reaction, user) => reaction.emoji.name === "➡️" && user.id === msg.author.id;
            const membersFilter = (reaction, user) => reaction.emoji.name === "📊" && user.id === msg.author.id;
            const IDFilter = (reaction, user) => reaction.emoji.name === "🆔" && user.id === msg.author.id;

            // collectors (parse for 60 seconds)
            const leftCollector = sentMsg.createReactionCollector(leftFilter, {time: 60000});
            const rightCollector = sentMsg.createReactionCollector(rightFilter, {time: 60000});
            const membersCollector = sentMsg.createReactionCollector(membersFilter, {time: 60000});
            const IDCollector = sentMsg.createReactionCollector(IDFilter, {time: 60000});

            leftCollector.on("collect", 
                function() {
                    sentMsg.reactions.cache.get("⬅️").users.remove(msg.author);
                    resetTimer(leftCollector, rightCollector, membersCollector, IDCollector);

                    if (page !== 1) { 
                        page--;
                        sentMsg.edit(generatePage(bot, servers, memberCount, page, pageCount, info));
                    } 
                }
            );
            
            rightCollector.on("collect", 
                function() {
                    sentMsg.reactions.cache.get("➡️").users.remove(msg.author);
                    resetTimer(leftCollector, rightCollector, membersCollector, IDCollector);

                    if (page !== pageCount) {
                        page++;      
                        sentMsg.edit(generatePage(bot, servers, memberCount, page, pageCount, info));
                    } 
                }
            );

            membersCollector.on("collect", 
                function() {
                    sentMsg.reactions.cache.get("📊").users.remove(msg.author);
                    resetTimer(leftCollector, rightCollector, membersCollector, IDCollector);
                    
                    info = "members";
                    sentMsg.edit(generatePage(bot, servers, memberCount, page, pageCount, info));
                }
            );

            IDCollector.on("collect", 
                function() {
                    sentMsg.reactions.cache.get("🆔").users.remove(msg.author);
                    resetTimer(leftCollector, rightCollector, membersCollector, IDCollector);

                    info = "ID";
                    sentMsg.edit(generatePage(bot, servers, memberCount, page, pageCount, info));
                }
            );

            // edit message when reaction collectors expire
            IDCollector.on("end", 
                function() {
                    sentMsg.edit(Format.expirationNotice, generatePage(bot, servers, memberCount, page, pageCount, info));
                }
            );

        } catch (err) {
            ErrorLog.log(bot, msg, msg.guild.id, "servers", err);
        }
    }
}

function resetTimer(left, right, members, ID) {
    left.resetTimer({time: 60000});
    right.resetTimer({time: 60000});
    members.resetTimer({time: 60000});
    ID.resetTimer({time: 60000});
}

function generatePage(bot, servers, memberCount, page, pageCount, info) {
    let start = (page - 1) * 20;
    let infoTitle = info === "ID" ? "ID" : "MEMBERS";
    
    if (start <= servers.length - 1) {
        let serverList = "";
        let dataList = "";
        let infoList = "";
        let date = new Date();

        let i;
        for (i = start; (i < start + 20 && i < servers.length); i++) {
            joinDate = servers[i].joinedAt;
            
            serverList += `\n**${i + 1}.** ${servers[i].name}`;
            if (joinDate.toDateString() === date.toDateString())
                serverList += " 🆕";

            dataList += `\n${joinDate.toDateString()}`;
            
            if (info === "ID")
                infoList += `\n${servers[i].id}`;
            else
                infoList += `\n${servers[i].memberCount}`;
        }

        let embed = new Discord.MessageEmbed()
            .setColor("#D5AB88")
            .setTitle(":notebook_with_decorative_cover: **━━━━━━━━ BOT SERVER DATA ━━━━━━━━** :notebook_with_decorative_cover:")
            .setDescription(`Logged in as **${bot.user.tag}**!`
                        + `\n\nHelping **${memberCount}** members`
                        + `\nIn **${bot.guilds.cache.size}** server(s):`)
            .addField("NAME", `${serverList}`, true)
            .addField("DATE ADDED", `${dataList}`, true)
            .addField(infoTitle, `${infoList}`, true)
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