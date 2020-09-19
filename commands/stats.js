// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../utilities/data.js");
// require mongo.js module
const Mongo = require("../utilities/mongo.js");
// require embeds for stat calculations
const Stats = require("../utilities/statFunctions.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "stats",
    description: "calculates pet talents based on provided stats",
    execute(bot, msg, args) {
        // react to command
        msg.react(bot.emojis.cache.get(Data.emojiIds.kiwi));
        
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
                .setTitle(`${Data.emojis.kiwi}${Data.space(1)} **━━━━━━━ KIWI PET STATS ━━━━━━━** ${Data.space(1)}${Data.emojis.kiwi}`)
                .setDescription(`Your Stats:`
                                + `\n${Data.emojis.str}: **${str}**/255 ${Data.space(2)}${Data.emojis.int}: **${int}**/250 ${Data.space(2)}${Data.emojis.agil}: **${agil}**/260 ${Data.space(2)}${Data.emojis.will}: **${will}**/260 ${Data.space(2)}${Data.emojis.power}: **${power}**/250`
                                + `\n\nUse the reactions below to change pages:`)
                .addField("\u200b", `${Data.emojis.dmg} **━ Base Stats ━** ${Data.emojis.dmg} ${Data.space(10)} ${Data.emojis.crit} **━ Rating Stats ━** ${Data.emojis.crit}`
                                    + `\n${Data.space(10)}${Data.emojis.dmg}, ${Data.emojis.res}, ${Data.emojis.pierce}, ${Data.emojis.acc}`
                                    + `${Data.space(34)}`
                                    + `${Data.emojis.crit}, ${Data.emojis.block}, ${Data.emojis.pip}, ${Data.emojis.pcon}`)
                .addField("\u200b", `${Data.emojis.heart} **━ Heal Stats ━** ${Data.emojis.heart} ${Data.space(11)} ${Data.emojis.luck} **━ Misc Stats ━** ${Data.emojis.luck}`
                                    + `\n${Data.space(16)}${Data.emojis.inc}, ${Data.emojis.out}, ${Data.emojis.health}`
                                    + `${Data.space(43)}`
                                    + `${Data.emojis.stunres}, ${Data.emojis.luck}, ${Data.emojis.mana}`)
                .addField("\u200b", `${Data.emojis.round} **━ Round Stats ━** ${Data.emojis.round}`
                                    + `\ndisplay stats like **in-game**\nand catch **fake** (${Data.emojis.fake}) stats`)
                .addField("\u200b", "\u200b")
                .addField("Like what you see?", `[**${Data.bot.text}**](${Data.bot.invite}) ${Data.emojis.kiwi}`
                                                + `\n[**${Data.server.text}**](${Data.server.link}) ${Data.emojis.spiralscholars}`)
                .setFooter(Data.footer.text, Data.footer.image);

            if (Data.update)
                embed.description += module.exports.update();

            msg.channel.send(embed).then(
                function(sentMsg) {
                    let page = "";
                    let rounded = false;

                    // generate reactions
                    sentMsg.react(bot.emojis.cache.get(Data.emojiIds.dmg));
                    sentMsg.react(bot.emojis.cache.get(Data.emojiIds.crit));
                    sentMsg.react(bot.emojis.cache.get(Data.emojiIds.heart));
                    sentMsg.react(bot.emojis.cache.get(Data.emojiIds.luck));
                    sentMsg.react(bot.emojis.cache.get(Data.emojiIds.round));

                    // reaction filters
                    const baseFilter = (reaction, user) => reaction.emoji.id === Data.emojiIds.dmg && user.id === msg.author.id;
                    const ratingFilter = (reaction, user) => reaction.emoji.id === Data.emojiIds.crit && user.id === msg.author.id;
                    const healFilter = (reaction, user) => reaction.emoji.id === Data.emojiIds.heart && user.id === msg.author.id;
                    const miscFilter = (reaction, user) => reaction.emoji.id === Data.emojiIds.luck && user.id === msg.author.id;
                    const roundFilter = (reaction, user) => reaction.emoji.id === Data.emojiIds.round && user.id === msg.author.id;

                    // collectors (parse for 60 seconds)
                    const baseCollector = sentMsg.createReactionCollector(baseFilter, {time: 60000});
                    const ratingCollector = sentMsg.createReactionCollector(ratingFilter, {time: 60000});
                    const healCollector = sentMsg.createReactionCollector(healFilter, {time: 60000});
                    const miscCollector = sentMsg.createReactionCollector(miscFilter, {time: 60000});
                    const roundCollector = sentMsg.createReactionCollector(roundFilter, {time: 60000});

                    baseCollector.on("collect", 
                        function() {
                            sentMsg.reactions.cache.get(Data.emojiIds.dmg).users.remove(msg.author);
                            module.exports.resetTimer(baseCollector, ratingCollector, healCollector, miscCollector, roundCollector);

                            if (rounded)
                                sentMsg.edit(Stats.base(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded base]", err));
                            else
                                sentMsg.edit(Stats.base(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [base]", err));
                                
                            page = "base";
                        }
                    );
                    ratingCollector.on("collect", 
                        function() {
                            sentMsg.reactions.cache.get(Data.emojiIds.crit).users.remove(msg.author);
                            module.exports.resetTimer(baseCollector, ratingCollector, healCollector, miscCollector, roundCollector);

                            if (rounded)
                                sentMsg.edit(Stats.rating(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded rating]", err));
                            else
                                sentMsg.edit(Stats.rating(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rating]", err));

                            page = "rating";
                        }
                    );
                    healCollector.on("collect", 
                        function() {
                            sentMsg.reactions.cache.get(Data.emojiIds.heart).users.remove(msg.author);
                            module.exports.resetTimer(baseCollector, ratingCollector, healCollector, miscCollector, roundCollector);

                            if (rounded)
                                sentMsg.edit(Stats.healing(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded healing]", err));
                            else
                                sentMsg.edit(Stats.healing(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [healing]", err));
                            
                            page = "healing";
                        }
                    );
                    miscCollector.on("collect", 
                        function() {
                            sentMsg.reactions.cache.get(Data.emojiIds.luck).users.remove(msg.author);
                            module.exports.resetTimer(baseCollector, ratingCollector, healCollector, miscCollector, roundCollector);

                            if (rounded)
                                sentMsg.edit(Stats.misc(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded misc]", err));
                            else
                                sentMsg.edit(Stats.misc(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [misc]", err));
                            
                            page = "misc";
                        }
                    );
                    roundCollector.on("collect", 
                        function() {
                            sentMsg.reactions.cache.get(Data.emojiIds.round).users.remove(msg.author);
                            module.exports.resetTimer(baseCollector, ratingCollector, healCollector, miscCollector, roundCollector);

                            switch (page) {
                                case "base":
                                    if (rounded) {
                                        sentMsg.edit(Stats.base(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded base]", err));
                                        rounded = false;
                                    } else {
                                        sentMsg.edit(Stats.base(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [base]", err));
                                        rounded = true;
                                    }
                                    break;
                                case "rating":
                                    if (rounded) {
                                        sentMsg.edit(Stats.rating(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded rating]", err));
                                        rounded = false;
                                    } else {
                                        sentMsg.edit(Stats.rating(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rating]", err));
                                        rounded = true;
                                    }
                                    break;
                                case "healing":
                                    if (rounded) {
                                        sentMsg.edit(Stats.healing(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded healing]", err));
                                        rounded = false;
                                    } else {
                                        sentMsg.edit(Stats.healing(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [healing]", err));
                                        rounded = true;
                                    }
                                    break;
                                case "misc":
                                    if (rounded) {
                                        sentMsg.edit(Stats.misc(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded misc]", err));
                                        rounded = false;
                                    } else {
                                        sentMsg.edit(Stats.misc(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [misc]", err));
                                        rounded = true;
                                    }
                                    break;
                                case "":
                                    console.log("round button pressed on main menu");
                                    break;
                                default:
                                    console.log("error parsing rounding updates");
                            }
                        }
                    );

                }
            ).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [reaction menu]", err));
        }

        // log command use
        Mongo.logCMD(bot, msg, msg.guild.id, "stats");
    },
    resetTimer(base, rating, health, misc, round) {
        base.resetTimer({time: 60000});
        rating.resetTimer({time: 60000});
        health.resetTimer({time: 60000});
        misc.resetTimer({time: 60000});
        round.resetTimer({time: 60000});
    },  
    dataCheck(msg, args) {
        // if more or less than 5 arguments are provided
        if (args.length !== 5) {
            const amountEmbed = new Discord.MessageEmbed()
                .setColor("#DD2E44")
                .setTitle(":exclamation: **━━━━━━━━ ERROR ━━━━━━━━** :exclamation:")
                .setDescription(`You must enter **5 numbers** with the **${Data.prefix}stats** command!
                                \n*\`You did not enter 5 numbers with the command\`*
                                \n${Data.prefix}stats ${Data.emojis.str} ${Data.emojis.int} ${Data.emojis.agil} ${Data.emojis.will} ${Data.emojis.power}
                                \n> **ex.**\n> ${Data.prefix}stats 248 308 260 243 227`)
                .addField("\u200b", "\u200b")
                .addField("Like what you see?", `[**${Data.bot.text}**](${Data.bot.invite}) ${Data.emojis.kiwi}`
                                                + `\n[**${Data.server.text}**](${Data.server.link}) ${Data.emojis.spiralscholars}`)
                .setFooter(Data.footer.text, Data.footer.image);

            msg.channel.send(amountEmbed).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [not 5 num entered error]", err));
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
                    .setTitle(":exclamation: **━━━━━━━━ ERROR ━━━━━━━━** :exclamation:")
                    .setDescription(`You must enter **5 numbers** with the **${Data.prefix}stats** command!
                                    \n*\`You entered a non-number with the command\`*
                                    \n${Data.prefix}stats ${Data.emojis.str} ${Data.emojis.int} ${Data.emojis.agil} ${Data.emojis.will} ${Data.emojis.power}
                                    \n> **ex.**\n> ${Data.prefix}stats 248 308 260 243 227`)
                    .addField("\u200b", "\u200b")
                    .addField("Like what you see?", `[**${Data.bot.text}**](${Data.bot.invite}) ${Data.emojis.kiwi}`
                                                + `\n[**${Data.server.text}**](${Data.server.link}) ${Data.emojis.spiralscholars}`)
                    .setFooter(Data.footer.text, Data.footer.image);

                msg.channel.send(typeEmbed).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [non num entered error]", err));
                return false;
            
            // otherwise check bounds (highest selfish grant: +65 +50 +40 +40 +40 +25 = +260)
            } else if (str < 0 || str > 515 || int < 0 || int > 510 || agil < 0 || agil > 520 || will < 0 || will > 520 || power < 0 || power > 510) {
                const boundsEmbed = new Discord.MessageEmbed()
                    .setColor("#DD2E44")
                    .setTitle(":exclamation: **━━━━━━━━ ERROR ━━━━━━━━** :exclamation:")
                    .setDescription(`You must enter **5 numbers** with the **${Data.prefix}stats** command!
                                    \n*\`You entered a stat that was either too big or too small\`*
                                    \n${Data.prefix}stats ${Data.emojis.str} ${Data.emojis.int} ${Data.emojis.agil} ${Data.emojis.will} ${Data.emojis.power}
                                    \n> **ex.**\n> ${Data.prefix}stats 248 308 260 243 227`)
                    .addField("\u200b", "\u200b")
                    .addField("Like what you see?", `[**${Data.bot.text}**](${Data.bot.invite}) ${Data.emojis.kiwi}`
                                                + `\n[**${Data.server.text}**](${Data.server.link}) ${Data.emojis.spiralscholars}`)
                    .setFooter(Data.footer.text, Data.footer.image);

                msg.channel.send(boundsEmbed).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [out of bounds error]", err));
                return false;
            }
        }

        return true;
    },
    update() {
        return `\n\n\n**:new: ━━ NEW UPDATE ━━ :new:**`
            + `\n\nPress the ${Data.emojis.round}${Data.space(1)} button to toggle *rounded* stats as they're displayed **in game**!`
            + `\n\nA ${Data.emojis.fake} mark means the stat is **fake**`
            + `\n\n> **fake stat ex.**`
            + `\n> shows **10%** ${Data.emojis.life}${Data.emojis.dmg} on pet, but only gives you **9%** ${Data.emojis.life}${Data.emojis.dmg} in your gear stats`;
    }
}