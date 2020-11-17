// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../utilities/data.js");
// require mongo.js module
const Mongo = require("../utilities/mongo.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");
// require Config
const Config = require("../utilities/config.js");

module.exports = {
    name: "prefix",
    description: "change Kiwi's prefix for the server",
    async execute(bot, msg, args) {
        // react to command
        msg.react(bot.emojis.cache.get(Data.emojiIds.kiwi));

        // if no inputs provided
        if (args.length === 0) {
            let prefix = Config.defaultPrefix;

            try {
                // get current prefix
                prefix = await Mongo.getPrefix(bot, msg);

            } catch (err) {
                ErrorLog.log(bot, msg, msg.guild.id, `prefix [loading prefix]`, err);
            }

            // inform user of update
            const confirmation = new Discord.MessageEmbed()
                .setColor("#8899A6")
                .setTitle(`🛠️ **━━━━━━ PREFIX ━━━━━━** 🛠️`)
                .setDescription(`Your server's prefix for Kiwi ${Data.space(1)}${Data.emojis.kiwi} is: \`${prefix}\``)
                .addField("\u200b", "\u200b")
                .addField("Like what you see?", `[**${Data.bot.text}**](${Data.bot.invite}) ${Data.emojis.kiwi}`
                                            + `\n[**${Data.server.text}**](${Data.server.link}) ${Data.emojis.spiralscholars}`)
                .setFooter(Data.footer.text, Data.footer.image);

            msg.channel.send(confirmation).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "prefix [current prefix response]", err));

        } else {
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
                .setTitle(`✅ **━━━━━━ PREFIX UPDATED ━━━━━━** ✅`)
                .setDescription(`Your server's prefix for Kiwi ${Data.space(1)}${Data.emojis.kiwi}`
                                + `\nhas been **successfully updated** to \`${newPrefix}\`!`)
                .addField("\u200b", "\u200b")
                .addField("Like what you see?", `[**${Data.bot.text}**](${Data.bot.invite}) ${Data.emojis.kiwi}`
                                            + `\n[**${Data.server.text}**](${Data.server.link}) ${Data.emojis.spiralscholars}`)
                .setFooter(Data.footer.text, Data.footer.image);

            msg.channel.send(confirmation).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "prefix [update response]", err));
        }

        // log command use
        Mongo.logCMD(bot, msg, msg.guild.id, "prefix");
    }
}