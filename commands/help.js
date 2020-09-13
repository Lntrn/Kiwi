// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../utilities/data.js");
// require cmds.js module
const CMDS = require("./cmds.js");

module.exports = {
    name: "help",
    description: "provides information on Kiwi's commands",
    execute(bot, msg) {
        // react to command
        msg.react(bot.emojis.cache.get(Data.emojiIds.kiwi));

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

                        if (page === 2) {
                            sentMsg.edit(module.exports.pageOne());   
                            page = 1;                                                     
                        } 
                    }
                );
                rightCollector.on("collect", 
                    function() {
                        sentMsg.reactions.cache.get("➡️").users.remove(msg.author);
                        module.exports.resetTimer(leftCollector, rightCollector);

                        if (page === 1) {
                            sentMsg.edit(module.exports.pageTwo());   
                            page = 2;                                                     
                        } 
                    }
                );
            }
        ).catch(err => console.log("Error adding reactions!" + err));

        // update count of help cmd uses
        // CMDS.updateData(bot, msg.author, msg.guild.id, "help");
        CMDS.cmdLog(bot, msg, msg.guild.id, "help");
    },
    resetTimer(left, right) {
        left.resetTimer({time: 60000});
        right.resetTimer({time: 60000});
    },
    pageOne(){
        const embed = new Discord.MessageEmbed()
            .setColor("#FFD983")
            .setTitle(":scroll: **━━━━━ KIWI HELP ━━━━━** :scroll:")
            .setDescription(`*Prefix is **${Data.prefix}** or **${Data.altPrefix}***`
                            + `\n\n:small_blue_diamond: **\`${Data.prefix}stats\`**`
                            + `\n*calculates pet talent stats*`
                            + `\n\n> ${Data.prefix}stats ${Data.emojis.str} ${Data.emojis.int} ${Data.emojis.agil} ${Data.emojis.will} ${Data.emojis.power}`
                            + `\n> **ex.**\n> ${Data.prefix}stats 248 308 260 243 227`
                            + `\n\n:small_blue_diamond: **\`${Data.prefix}invite\`**`
                            + `\n*get an invite to add Kiwi to your server!*`)
            .addField("\u200b", "page **1** of **2**")
            .addField("\u200b", "\u200b")
            .addField("Still need help?", `Head to our [Support Server](${Data.supportLink})!`
                                        + `\n\n[**Invite Kiwi!**](${Data.inviteLink}) ${Data.emojis.kiwi}`
                                        + `\n[**Spiral Scholars**](${Data.server.link}) ${Data.emojis.spiralscholars}`)
            .setFooter(Data.footer.text, Data.footer.image);

        return embed;
    },
    pageTwo(){
        const embed = new Discord.MessageEmbed()
            .setColor("#FFD983")
            .setTitle(":scroll: **━━━━━ KIWI HELP ━━━━━** :scroll:")
            .setDescription(`*Prefix is **${Data.prefix}** or **${Data.altPrefix}***`
                            + `\n\n:small_blue_diamond: **\`${Data.prefix}bug\`**`
                            + `\n*report a bug with Kiwi*`
                            + `\n\n> **ex.**\n> ${Data.prefix}bug stats aren't working 😑`
                            + `\n\n:small_blue_diamond: **\`${Data.prefix}suggest\`**`
                            + `\n*submit a suggestion for Kiwi*`
                            + `\n\n> **ex.**\n> ${Data.prefix}suggest make bot good pls`)
            .addField("\u200b", "page **2** of **2**")
            .addField("\u200b", "\u200b")
            .addField("Still need help?", `Head to our [Support Server](${Data.supportLink})!`
                                        + `\n\n[**Invite Kiwi!**](${Data.inviteLink}) ${Data.emojis.kiwi}`
                                        + `\n[**Spiral Scholars**](${Data.server.link}) ${Data.emojis.spiralscholars}`)
            .setFooter(Data.footer.text, Data.footer.image);

        return embed;
    }
}