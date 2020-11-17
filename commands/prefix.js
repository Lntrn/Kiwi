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
    name: "prefix",
    description: "change Kiwi's prefix for the server",
    async execute(bot, msg, args) {
        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));

        // get author as guild member
        const member = bot.guilds.cache.get(msg.guild.id).members.cache.get(msg.author.id);

        // if no inputs provided
        if (args.length === 0) {
            let prefix = Config.defaultPrefix;

            try {
                // get current prefix
                prefix = await Config.prefix(bot, msg);

            } catch (err) {
                ErrorLog.log(bot, msg, msg.guild.id, `prefix [loading prefix]`, err);
            }

            // inform user of update
            const confirmation = new Discord.MessageEmbed()
                .setColor("#8899A6")
                .setTitle(`🛠️ **━━━━━━ PREFIX ━━━━━━** 🛠️`)
                .setDescription(`Your server's prefix for Kiwi ${Format.space(1)}${Emojis.kiwi.pub} is: **\`${prefix}\`**`)
                .addField("\u200b", "\u200b")
                .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                            + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
                .setFooter(Format.footer.text, Format.footer.image);

            msg.channel.send(confirmation).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "prefix [current prefix response]", err));

        } else if (member.hasPermission("MANAGE_GUILD")) {
            const newPrefix = args.shift();

            try {
                // update prefix
                await Mongo.updatePrefix(bot, msg, newPrefix);

            } catch (err) {
                ErrorLog.log(bot, msg, msg.guild.id, `prefix [updating prefix]`, err);
            }

            // inform user of update
            const confirmation = new Discord.MessageEmbed()
                .setColor("#77B255")
                .setTitle(`✅ **━━━━ PREFIX UPDATED ━━━━** ✅`)
                .setDescription(`Your server's prefix for Kiwi ${Format.space(1)}${Emojis.kiwi.pub}`
                                + `\nhas been **successfully updated** to **\`${newPrefix}\`**!`)
                .addField("\u200b", "\u200b")
                .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                            + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
                .setFooter(Format.footer.text, Format.footer.image);

            msg.channel.send(confirmation).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "prefix [update response]", err));
        }

        // log command use
        Mongo.logCMD(bot, msg, msg.guild.id, "prefix");
    }
}