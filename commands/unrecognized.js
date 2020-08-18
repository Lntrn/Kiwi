// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../data.js");

module.exports = {
    name: "unrecognized",
    description: "default response if an unrecognized command is entered",
    execute(msg, cmd) {
        const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
            .setDescription(`Unrecognized command: **${cmd}**`
                            + `\n\nUse the **${Data.prefix}help** command for a list of Kiwi's commands`)
            .addField("\u200b", "\u200b")
            .setFooter(Data.footer.footer, Data.footer.image);

            msg.channel.send(embed);
    }
}