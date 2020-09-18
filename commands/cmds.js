// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("./data.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "cmds",
    description: "owner command to check the command usage stats",
    execute(bot, msg) { // card_box 9AAAB4
        // allow usage only if user is the owner
        if (msg.author.id === Data.ownerId) {

        } else {
            const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
            .setDescription(`You must be the bot owner, ${Data.ownerMention}, to use this command!`)
            .addField("\u200b", "\u200b")
            .setFooter(Data.footer.text, Data.footer.image);

            msg.channel.send(embed).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "cmds [not dev response]", err));
        }
    }
}