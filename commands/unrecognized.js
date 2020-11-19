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
    name: "unrecognized",
    description: "default response if an unrecognized command is entered",
    async execute(bot, msg, cmd) {
        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));
        
        const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━━ ERROR ━━━━━━** :exclamation:")
            .setDescription(`Unrecognized command: **${cmd}**`
                            + `\n\nUse the **\`help\`** for a list of Kiwi's commands`
                            + `\n\nWas this prompt a mistake?`
                            + `\nChange Kiwi's prefix with the **\`prefix\`** command`)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                        + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
            .setFooter(Format.footer.text, Format.footer.image);

            msg.channel.send(embed).catch(err => ErrorLog.log(bot, msg, msg.guild.id, `unrecognized [${cmd}]`, err));

        // log command use
        Mongo.logCMD(bot, msg, msg.guild.id, `unrecognized: "${cmd}"`);
    }
}