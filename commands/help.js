// require discord.js module
const Discord = require("discord.js");
// require config.js module
const Config = require("../utilities/config.js");
// require emojis.js module
const Emojis = require("../utilities/emojis.js");
// require format.js module
const Format = require("../utilities/format.js");
// require mongo.js module
const Mongo = require("../utilities/mongo.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "help",
    description: "provides information on Kiwi's commands",
    async execute(bot, msg) {
        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));

        try {
            // load prefix
            const prefix = await Config.prefix(bot, msg);
            const sentMsg = await msg.channel.send(pageOne(prefix));

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

                    if (page === 2) {
                        sentMsg.edit(pageOne(prefix));   
                        page = 1;                                                     
                    } 
                }
            );

            rightCollector.on("collect", 
                function() {
                    sentMsg.reactions.cache.get("➡️").users.remove(msg.author);
                    resetTimer(leftCollector, rightCollector);

                    if (page === 1) {
                        sentMsg.edit(pageTwo(prefix));   
                        page = 2;                                                     
                    } 
                }
            );

            // edit message when reaction collectors expire
            rightCollector.on("end", 
                function() {
                    if (page === 1)
                        sentMsg.edit("*The reaction menu on this message has expired*", pageOne(prefix));
                    else
                        sentMsg.edit("*The reaction menu on this message has expired*", pageTwo(prefix));
                }
            );

        } catch (err) {
            ErrorLog.log(bot, msg, msg.guild.id, "help", err);
        }

        // log command use
        Mongo.logCMD(bot, msg, msg.guild.id, "help");
    }
}

function resetTimer(left, right) {
    left.resetTimer({time: 60000});
    right.resetTimer({time: 60000});
}

function pageOne(prefix){
    const embed = new Discord.MessageEmbed()
        .setColor("#FFD983")
        .setTitle(":scroll: **━━━━━ KIWI HELP ━━━━━** :scroll:")
        .setDescription(`*Your server's prefix is **${prefix}***`
                        + `\n\n:small_blue_diamond: **\`${prefix} stats\`**`
                        + `\n*calculates pet talent stats*`
                        + `\n\n> ${prefix}stats ${Emojis.str.pub} ${Emojis.int.pub} ${Emojis.agil.pub} ${Emojis.will.pub} ${Emojis.power.pub}`
                        + `\n> **ex.**\n> ${prefix}stats 248 308 260 243 227`
                        + `\n\n:small_blue_diamond: **\`${prefix} invite\`**`
                        + `\n*get an invite to add Kiwi to your server*`
                        + `\n\n:small_blue_diamond: **\`${prefix} prefix\`** **(❗NEW )**`
                        + `\n*change/get Kiwi's prefix in your server*`
                        + `\n*must have **manage server** perm to use*`)
        .addField("\u200b", "page **1** of **2**")
        .addField("\u200b", "\u200b")
        .addField("Still need help?", `Head to our [Support Server](${Format.supportLink})!`
                                    + `\n\n[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                    + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
        .setFooter(Format.footer.text, Format.footer.image);

    return embed;
}

function pageTwo(prefix){
    const embed = new Discord.MessageEmbed()
        .setColor("#FFD983")
        .setTitle(":scroll: **━━━━━ KIWI HELP ━━━━━** :scroll:")
        .setDescription(`*Your server's prefix is **${prefix}***`
                        + `\n\n:small_blue_diamond: **\`${prefix} formulas\`** **(❗NEW )**`
                        + `\n*view the formulas for the talents Kiwi displays*`
                        + `\n\n:small_blue_diamond: **\`${prefix} bug\`**`
                        + `\n*report a bug with Kiwi*`
                        + `\n\n> **ex.**\n> ${prefix}bug stats aren't working 😑`
                        + `\n\n:small_blue_diamond: **\`${prefix} suggest\`**`
                        + `\n*submit a suggestion for Kiwi*`
                        + `\n\n> **ex.**\n> ${prefix} suggest make bot good pls`)
        .addField("\u200b", "page **2** of **2**")
        .addField("\u200b", "\u200b")
        .addField("Still need help?", `Head to our [Support Server](${Format.supportLink})!`
                                    + `\n\n[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                    + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
        .setFooter(Format.footer.text, Format.footer.image);

    return embed;
}