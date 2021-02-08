// require discord.js module
const Discord = require("discord.js");
// require blacklist module
const Blacklist = require("../utilities/blacklist.js");
// require emojis.js module
const Emojis = require("../utilities/emojis.js");
// require format.js module
const Format = require("../utilities/format.js");
// require channels.js module
const Channels = require("../utilities/channels.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "banReload",
    description: "reload the local copy of the banlist",
    async execute(bot, msg) {
        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));

        try {
            // load blacklists
		    const success = await Blacklist.load(true, true);

            const embed = new Discord.MessageEmbed()
                .setColor("#3B88C3")
                .setTitle(`:arrows_counterclockwise: **━━━━━ BLACKLIST RELOADED ━━━━━** :arrows_counterclockwise:`)
                .setDescription(`**Date:** ${Date()}`
                                + `\n\n**Users:** ${success}`
                                + `\n**Servers:** ${success}`)
                .addField("\u200b", "\u200b")
                .setFooter(Format.footer.text, Format.footer.image);

            bot.channels.cache.get(Channels.devCmds.id).send(embed).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "ping", err));

        } catch (err) {
            ErrorLog.log(bot, msg, msg.guild.id, `reloading blacklist from database`, err);
        }
    }
}