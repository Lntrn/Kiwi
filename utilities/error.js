// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("./data.js");

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
                .setFooter(Data.footer.text, Data.footer.image);

            msg.author.send(perms).catch((err) => {
                bot.users.fetch(Data.ownerId).then(
                    function(user) {
                        const sendError = new Discord.MessageEmbed()
                            .setColor("#DD2E44")
                            .setTitle(":exclamation: **━━━━━━━━━━━ ERROR ━━━━━━━━━━━** :exclamation:")
                            .setDescription(`Couldn't DM user ${msg.author}! Check <#${Data.errorLog}> for Permissions error`
                                            + `\n\n**Error:**`
                                            + `\n${err}`)
                            .setFooter(Data.footer.text, Data.footer.image);

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
            .setFooter(Data.footer.text, Data.footer.image);

        bot.channels.cache.get(Data.errorLog).send(log);
        bot.channels.cache.get(Data.errorLog).send(Data.devReportRole);
    }
}