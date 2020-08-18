// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../data.js");
// require embeds for stat calculations
const Stats = require("../statFunctions.js");

module.exports = {
    name: "stats",
    description: "calculates pet talents based on provided stats",
    execute(bot, msg, args) {
        // command check
        if (module.exports.dataCheck(msg, args)) {
            const str = parseInt(args[0]);
            const int = parseInt(args[1]);
            const agil = parseInt(args[2]);
            const will = parseInt(args[3]);
            const power = parseInt(args[4]);
            const happy = str + int + agil + will + power;

            const embed = new Discord.MessageEmbed()
                .setColor("#C4DE61")
                .setTitle(`${Data.emojis.kiwi}${Data.space(1)} **━━━━━━━━ KIWI PET STATS ━━━━━━━━** ${Data.space(1)}${Data.emojis.kiwi}`)
                .setDescription(`Your Stats:
                                ${Data.emojis.str}: **${str}**/255 ${Data.space(2)}${Data.emojis.int}: **${int}**/250 ${Data.space(2)}${Data.emojis.agil}: **${agil}**/260 ${Data.space(2)}${Data.emojis.will}: **${will}**/260 ${Data.space(2)}${Data.emojis.power}: **${power}**/250
                                \nUse the reactions below to change pages:
                                \n> **Base Stats ${Data.emojis.dmg}:** ${Data.space(8)} ${Data.emojis.dmg}, ${Data.emojis.res}, ${Data.emojis.pierce}, and ${Data.emojis.acc} stats
                                > **Rating Stats ${Data.emojis.crit}:** ${Data.space(3)} ${Data.emojis.crit}, ${Data.emojis.block}, ${Data.emojis.pip}, and ${Data.emojis.pcon} stats
                                > **Heal Stats ${Data.emojis.heart}:** ${Data.space(8)} ${Data.emojis.inc}, ${Data.emojis.out}, and ${Data.emojis.health} stats
                                > **Misc Stats ${Data.emojis.luck}:** ${Data.space(7)} ${Data.emojis.stunres}, ${Data.emojis.luck}, and ${Data.emojis.mana} stats`)
                .addField("\u200b", "\u200b")
                .setFooter(Data.footer.footer, Data.footer.image);

            msg.channel.send(embed).then(
                function(sentMsg) {
                    // generate reactions
                    sentMsg.react(bot.emojis.cache.get(Data.emojiIds.dmg));
                    sentMsg.react(bot.emojis.cache.get(Data.emojiIds.crit));
                    sentMsg.react(bot.emojis.cache.get(Data.emojiIds.heart));
                    sentMsg.react(bot.emojis.cache.get(Data.emojiIds.luck));

                    // reaction filters
                    const baseFilter = (reaction, user) => reaction.emoji.id === Data.emojiIds.dmg && user.id === msg.author.id;
                    const ratingFilter = (reaction, user) => reaction.emoji.id === Data.emojiIds.crit && user.id === msg.author.id;
                    const healFilter = (reaction, user) => reaction.emoji.id === Data.emojiIds.heart && user.id === msg.author.id;
                    const miscFilter = (reaction, user) => reaction.emoji.id === Data.emojiIds.luck && user.id === msg.author.id;

                    // collectors (parse for 5 seconds)
                    const baseCollector = sentMsg.createReactionCollector(baseFilter, {time: 60000});
                    const ratingCollector = sentMsg.createReactionCollector(ratingFilter, {time: 60000});
                    const healCollector = sentMsg.createReactionCollector(healFilter, {time: 60000});
                    const miscCollector = sentMsg.createReactionCollector(miscFilter, {time: 60000});

                    baseCollector.on("collect", 
                        function() {
                            sentMsg.reactions.cache.get(Data.emojiIds.dmg).users.remove(msg.author);
                            sentMsg.edit(Stats.base(str, int, agil, will, power));
                        }
                    );
                    ratingCollector.on("collect", 
                        function() {
                            sentMsg.reactions.cache.get(Data.emojiIds.crit).users.remove(msg.author);
                            sentMsg.edit(Stats.rating(str, int, agil, will, power));
                        }
                    );
                    healCollector.on("collect", 
                        function() {
                            sentMsg.reactions.cache.get(Data.emojiIds.heart).users.remove(msg.author);
                            sentMsg.edit(Stats.healing(str, int, agil, will, power));
                        }
                    );
                    miscCollector.on("collect", 
                        function() {
                            sentMsg.reactions.cache.get(Data.emojiIds.luck).users.remove(msg.author);
                            sentMsg.edit(Stats.misc(str, int, agil, will, power));
                        }
                    );

                }
            ).catch(err => console.log("Error adding reactions!"));
        }
    },
    dataCheck(msg, args) {
        // if more or less than 5 arguments are provided
        if (args.length !== 5) {
            const amountEmbed = new Discord.MessageEmbed()
                .setColor("#DD2E44")
                .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
                .setDescription(`You must enter **5 numbers** with the **${Data.prefix}stats** command!
                                \n*You did not enter **5** numbers with the command*
                                \n${Data.prefix}stats ${Data.emojis.str} ${Data.emojis.int} ${Data.emojis.agil} ${Data.emojis.will} ${Data.emojis.power}
                                \n> **ex.**\n> ${Data.prefix}stats 255 250 260 260 250`)
                .addField("\u200b", "\u200b")
                .setFooter(Data.footer.footer, Data.footer.image);

            msg.channel.send(amountEmbed);
            return false;
        
        // otherwise check data
        } else {
            const str = parseInt(args[0]);
            const int = parseInt(args[1]);
            const agil = parseInt(args[2]);
            const will = parseInt(args[3]);
            const power = parseInt(args[4]);

            // if arguments provided aren't numbers
            if (!Number.isInteger(str) || !Number.isInteger(int) || !Number.isInteger(agil) || !Number.isInteger(will) || !Number.isInteger(power)) {
                const typeEmbed = new Discord.MessageEmbed()
                    .setColor("#DD2E44")
                    .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
                    .setDescription(`You must enter **5 numbers** with the **${Data.prefix}stats** command!
                                    \n*You entered a **non-number** with the command*
                                    \n${Data.prefix}stats ${Data.emojis.str} ${Data.emojis.int} ${Data.emojis.agil} ${Data.emojis.will} ${Data.emojis.power}
                                    \n> **ex.**\n> ${Data.prefix}stats 255 250 260 260 250`)
                    .addField("\u200b", "\u200b")
                    .setFooter(Data.footer.footer, Data.footer.image);

                msg.channel.send(typeEmbed);
                return false;
            
            // otherwise check bounds (highest selfish grant: +65 +50 +40 +40 +40 +25 = +160)
            } else if (str < 0 || str > 415 || int < 0 || int > 410 || agil < 0 || agil > 420 || will < 0 || will > 420 || power < 0 || power > 410) {
                const boundsEmbed = new Discord.MessageEmbed()
                    .setColor("#DD2E44")
                    .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
                    .setDescription(`You must enter **5 numbers** with the **${Data.prefix}stats** command!
                                    \n*You entered a stat that was either **too big** or **too small***
                                    \n${Data.prefix}stats ${Data.emojis.str} ${Data.emojis.int} ${Data.emojis.agil} ${Data.emojis.will} ${Data.emojis.power}
                                    \n> **ex.**\n> ${Data.prefix}stats 255 250 260 260 250`)
                    .addField("\u200b", "\u200b")
                    .setFooter(Data.footer.footer, Data.footer.image);

                msg.channel.send(boundsEmbed);
                return false;
            }
        }

        return true;
    }
}