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
            .setDescription(`*List of Kiwi's commands (prefix is **${Data.prefix}**):*`
                            + `\n\n:small_blue_diamond:** ${Data.prefix}stats**`
                            + `\n*calculates pet talents based on provided stats*`
                            + `\n\n> ${Data.prefix}stats ${Data.emojis.str} ${Data.emojis.int} ${Data.emojis.agil} ${Data.emojis.will} ${Data.emojis.power}`
                            + `\n> **ex.**\n> ${Data.prefix}stats 255 250 260 260 250`
                            + `\n\n:small_blue_diamond:** ${Data.prefix}bug**`
                            + `\n*report a bug with Kiwi (please be as specific as possible)*`
                            + `\n\n> ${Data.prefix}bug [**description**]`
                            + `\n> **ex.**\n> ${Data.prefix}bug the stats command isn't changing pages correctly`
                            + `\n\n:small_blue_diamond:** ${Data.prefix}suggestion**`
                            + `\n*submit a suggestion for Kiwi*`
                            + `\n\n> ${Data.prefix}suggestion [**description**]`
                            + `\n> **ex.**\n> ${Data.prefix}suggestion You should totally add XXX to Kiwi`
                            + `\n\n:small_blue_diamond:** ${Data.prefix}invite**`
                            + `\n*get an invite for Kiwi!*`)
            .addField("\u200b", "\u200b")
            .addField("Still need help?", `Head on over to our [Support Server](${Data.supportLink})!\n\n[**Invite Kiwi!**](${Data.inviteLink}) ${Data.emojis.kiwi}`)
            .setFooter(Data.footer.footer, Data.footer.image);

        msg.channel.send(embed);
    }
}