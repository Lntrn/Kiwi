// require discord.js module
const Discord = require("discord.js");
// require config.js module
const Config = require("../utilities/config.js");
// require channels.js module
const Channels = require("../utilities/channels.js");
// require format.js module
const Format = require("../utilities/format.js");
// require roles.js module
const Roles = require("../utilities/roles.js");

module.exports = {
    name: "error",
    description: "sends errors that Kiwi encounters to a logging channel",
    log(bot, msg, serverID, cmd, error) { // eventually remove serverID from paramaters (can be obtained from msg)
        date = new Date();

        // if the error was due to lack of permissions DM command issuer
        if (error.code === Discord.Constants.APIErrors.MISSING_PERMISSIONS) {
            const perms = new Discord.MessageEmbed()
                .setColor("#DD2E44")
                .setTitle(":exclamation: **━━━━━━━━━━━ ERROR ━━━━━━━━━━━** :exclamation:")
                .setDescription(`It seems I don't have permission to send messages in **${msg.channel}**!`
                                + `\n\nPlease make sure I have the following permissions:`
                                + `\n▫️**Send Messages**`
                                + `\n▫️**Read Messages**`
                                + `\n▫️**Manage Messages**`
                                + `\n▫️**Read Message History**`
                                + `\n▫️**Use External Emojis**`
                                + `\n▫️**Add Reactions**`
                                + `\n▫️**Embed Links**`
                                + `\n\nIf you can't grant those permissions in **${bot.guilds.cache.get(serverID).name}**, please notify a member of staff`
                                + `\n\nThank you! ❤️`)
                .setFooter(Format.footer.text, Format.footer.image);

            msg.author.send(perms).catch((err) => {
                bot.users.fetch(Config.ownerID).then(
                    function(user) {
                        const sendError = new Discord.MessageEmbed()
                            .setColor("#DD2E44")
                            .setTitle(":exclamation: **━━━━━━━━━━━ ERROR ━━━━━━━━━━━** :exclamation:")
                            .setDescription(`Couldn't DM user ${msg.author}! Check ${Channels.errorLog.pub} for Permissions error`
                                            + `\n\n**Error:**`
                                            + `\n${err}`)
                            .setFooter(Format.footer.text, Format.footer.image);

                        user.send(sendError);
                    }
                )
            });
        }

        const log = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━━━━━━━ ERROR ━━━━━━━━━━━** :exclamation:")
            .setDescription(`**Command Used:** ${cmd}`
                            + `\n**User:** ${msg.author}`
                            + `\n**Server:** ${bot.guilds.cache.get(serverID).name}`
                            + `\n**Channel:** ${msg.channel}`
                            + `\n**Date:** ${date.toDateString()}`
                            + `\n\n**Error:**`
                            + `\n${error}`)
            .setFooter(Format.footer.text, Format.footer.image);

        bot.channels.cache.get(Channels.errorLog.id).send(log);
        bot.channels.cache.get(Channels.errorLog.id).send(Roles.dev.pub);
    },
    userBlacklisted(bot, msg, reason) {
        const response = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(`🚫${Format.space(1)} **━━━━━━━━ USER BLACKLISTED ━━━━━━━━** ${Format.space(1)}🚫`)
            .setDescription(`Due to abuse of the bot, **you** have been **blacklisted** from using ${Emojis.kiwi.pub} **Kiwi**`
                            + `\nYou will no longer be able to access the bot in any server`
                            + `\n\nReason for ban: \n${reason}`
                            + `\n\n If you believe this is a mistake, please submit a request to be removed from the blacklist in our [Support Server](${Format.supportLink})`)
            .addField("\u200b", "\u200b")
            .setFooter(Format.footer.text, Format.footer.image);

        msg.channel.send(response).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "blacklisted user response", err));
    },
    serverBlacklisted(bot, msg, reason) {
        const response = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(`🚫${Format.space(1)} **━━━━━━━━ SERVER BLACKLISTED ━━━━━━━━** ${Format.space(1)}🚫`)
            .setDescription(`Due to abuse of the bot, **this server** has been **blacklisted** from using ${Emojis.kiwi.pub} **Kiwi**`
                            + `\nKiwi's commands will no longer work in this server`
                            + `\n\nReason for ban: \n${reason}`
                            + `\n\n If you believe this is a mistake, please submit a request to have this server removed from the blacklist in our [Support Server](${Format.supportLink})`)
            .addField("\u200b", "\u200b")
            .setFooter(Format.footer.text, Format.footer.image);

        msg.channel.send(response).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "blacklisted user response", err));
    }
}