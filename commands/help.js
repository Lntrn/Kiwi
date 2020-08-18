// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../data.js");

module.exports = {
    name: "help",
    description: "provides information on Kiwi's commands",
    execute(msg) {
        const embed = new Discord.MessageEmbed()
            .setColor("#FFD983")
            .setTitle(":scroll: **━━━━━ KIWI HELP ━━━━━** :scroll:")
            .setDescription(`*List of Kiwi's commands (prefix is **${Data.prefix}**):*
                            \n:small_blue_diamond:** ${Data.prefix}stats**
                            *calculates pet talents based on provided stats*
                            \n${Data.prefix}stats ${Data.emojis.str} ${Data.emojis.int} ${Data.emojis.agil} ${Data.emojis.will} ${Data.emojis.power}
                            > **ex.**\n> ${Data.prefix}stats 255 250 260 260 250
                            \n:small_blue_diamond:** ${Data.prefix}bug**
                            *report a bug with Kiwi (please be as specific as possible)*
                            \n${Data.prefix}bug [**description**]
                            > **ex.**\n> ${Data.prefix}bug the stats command isn't changing pages correctly
                            \n:small_blue_diamond:** ${Data.prefix}suggestion**
                            *submit a suggestion for Kiwi*
                            \n${Data.prefix}suggestion [**description**]
                            > **ex.**\n> ${Data.prefix}suggestion You should totally add XXX to Kiwi
                            \n:small_blue_diamond:** ${Data.prefix}invite**
                            *get an invite for Kiwi!*`)
            .addField("\u200b", "\u200b")
            .addField("Still need help?", `Head on over to our [Support Server](${Data.supportLink})!`)
            .setFooter(Data.footer.footer, Data.footer.image);

        msg.channel.send(embed);
    }
}