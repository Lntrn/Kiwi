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
// require embeds for stat calculations
const Stats = require("../utilities/statFunctions.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "stats",
    description: "calculates pet talents based on provided stats",
    async execute(bot, msg, args) {
        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));

        // get prefix
        const prefix = await Config.prefix(bot, msg); // promise rejection handled internally
        
        // command check
        if (dataCheck(msg, args, prefix)) {
            const str = parseInt(args[0]);
            const int = parseInt(args[1]);
            const agil = parseInt(args[2]);
            const will = parseInt(args[3]);
            const power = parseInt(args[4]);
            const happy = str + int + agil + will + power; // currently unused

            try {
                const sentMsg = await msg.channel.send(menu(str, int, agil, will, power));

                let page = "";
                let rounded = false;

                // generate reactions
                sentMsg.react(bot.emojis.cache.get(Emojis.dmg.id));
                sentMsg.react(bot.emojis.cache.get(Emojis.crit.id));
                sentMsg.react(bot.emojis.cache.get(Emojis.heart.id));
                sentMsg.react(bot.emojis.cache.get(Emojis.luck.id));
                sentMsg.react(bot.emojis.cache.get(Emojis.round.id));

                // reaction filters
                const baseFilter = (reaction, user) => reaction.emoji.id === Emojis.dmg.id && user.id === msg.author.id;
                const ratingFilter = (reaction, user) => reaction.emoji.id === Emojis.crit.id && user.id === msg.author.id;
                const healFilter = (reaction, user) => reaction.emoji.id === Emojis.heart.id && user.id === msg.author.id;
                const miscFilter = (reaction, user) => reaction.emoji.id === Emojis.luck.id && user.id === msg.author.id;
                const roundFilter = (reaction, user) => reaction.emoji.id === Emojis.round.id && user.id === msg.author.id;

                // collectors (parse for 60 seconds)
                const baseCollector = sentMsg.createReactionCollector(baseFilter, {time: 60000});
                const ratingCollector = sentMsg.createReactionCollector(ratingFilter, {time: 60000});
                const healCollector = sentMsg.createReactionCollector(healFilter, {time: 60000});
                const miscCollector = sentMsg.createReactionCollector(miscFilter, {time: 60000});
                const roundCollector = sentMsg.createReactionCollector(roundFilter, {time: 60000});

                baseCollector.on("collect", 
                    function() {
                        sentMsg.reactions.cache.get(Emojis.dmg.id).users.remove(msg.author);
                        resetTimer(baseCollector, ratingCollector, healCollector, miscCollector, roundCollector);

                        if (rounded)
                            sentMsg.edit(Stats.base(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded base]", err));
                        else
                            sentMsg.edit(Stats.base(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [base]", err));
                            
                        page = "base";
                    }
                );

                ratingCollector.on("collect", 
                    function() {
                        sentMsg.reactions.cache.get(Emojis.crit.id).users.remove(msg.author);
                        resetTimer(baseCollector, ratingCollector, healCollector, miscCollector, roundCollector);

                        if (rounded)
                            sentMsg.edit(Stats.rating(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded rating]", err));
                        else
                            sentMsg.edit(Stats.rating(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rating]", err));

                        page = "rating";
                    }
                );

                healCollector.on("collect", 
                    function() {
                        sentMsg.reactions.cache.get(Emojis.heart.id).users.remove(msg.author);
                        resetTimer(baseCollector, ratingCollector, healCollector, miscCollector, roundCollector);

                        if (rounded)
                            sentMsg.edit(Stats.healing(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded healing]", err));
                        else
                            sentMsg.edit(Stats.healing(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [healing]", err));
                        
                        page = "healing";
                    }
                );

                miscCollector.on("collect", 
                    function() {
                        sentMsg.reactions.cache.get(Emojis.luck.id).users.remove(msg.author);
                        resetTimer(baseCollector, ratingCollector, healCollector, miscCollector, roundCollector);

                        if (rounded)
                            sentMsg.edit(Stats.misc(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded misc]", err));
                        else
                            sentMsg.edit(Stats.misc(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [misc]", err));
                        
                        page = "misc";
                    }
                );

                roundCollector.on("collect", 
                    function() {
                        sentMsg.reactions.cache.get(Emojis.round.id).users.remove(msg.author);
                        resetTimer(baseCollector, ratingCollector, healCollector, miscCollector, roundCollector);

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

            // edit message when reaction collectors expire
            roundCollector.on("end",
            function() {
                switch (page) {
                    case "base":
                        if (rounded) {
                            sentMsg.edit("*The reaction menu on this message has expired*", Stats.base(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded base]", err));
                        } else {
                            sentMsg.edit("*The reaction menu on this message has expired*", Stats.base(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [base]", err));
                        }
                        break;
                    case "rating":
                        if (rounded) {
                            sentMsg.edit("*The reaction menu on this message has expired*", Stats.rating(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded rating]", err));
                        } else {
                            sentMsg.edit("*The reaction menu on this message has expired*", Stats.rating(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rating]", err));
                        }
                        break;
                    case "healing":
                        if (rounded) {
                            sentMsg.edit("*The reaction menu on this message has expired*", Stats.healing(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded healing]", err));
                        } else {
                            sentMsg.edit("*The reaction menu on this message has expired*", Stats.healing(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [healing]", err));
                        }
                        break;
                    case "misc":
                        if (rounded) {
                            sentMsg.edit("*The reaction menu on this message has expired*", Stats.misc(str, int, agil, will, power, true)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded misc]", err));
                        } else {
                            sentMsg.edit("*The reaction menu on this message has expired*", Stats.misc(str, int, agil, will, power, false)).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [misc]", err));
                        }
                        break;
                    default:
                        sentMsg.edit("*The reaction menu on this message has expired*", menu()).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [rounded misc]", err));
                }
            }
        );

            } catch (err) {
                ErrorLog.log(bot, msg, msg.guild.id, "stats [reaction menu]", err);
            }
        }

        // log command use
        Mongo.logCMD(bot, msg, msg.guild.id, "stats");
    }
}

function resetTimer(base, rating, health, misc, round) {
    base.resetTimer({time: 60000});
    rating.resetTimer({time: 60000});
    health.resetTimer({time: 60000});
    misc.resetTimer({time: 60000});
    round.resetTimer({time: 60000});
}

function menu(str, int, agil, will, power) {
    const menu = new Discord.MessageEmbed()
        .setColor("#C4DE61")
        .setTitle(`${Emojis.kiwi.pub}${Format.space(1)} **━━━━━━━ KIWI PET STATS ━━━━━━━** ${Format.space(1)}${Emojis.kiwi.pub}`)
        .setDescription(`Your Stats:`
                        + `\n${Emojis.str.pub}: **${str}**/255 ${Format.space(2)}${Emojis.int.pub}: **${int}**/250 ${Format.space(2)}${Emojis.agil.pub}: **${agil}**/260 ${Format.space(2)}${Emojis.will.pub}: **${will}**/260 ${Format.space(2)}${Emojis.power.pub}: **${power}**/250`
                        + `\n\nUse the reactions below to change pages:`)
        .addField("\u200b", `${Emojis.dmg.pub} **━ Base Stats ━** ${Emojis.dmg.pub} ${Format.space(10)} ${Emojis.crit.pub} **━ Rating Stats ━** ${Emojis.crit.pub}`
                            + `\n${Format.space(10)}${Emojis.dmg.pub}, ${Emojis.res.pub}, ${Emojis.pierce.pub}, ${Emojis.acc.pub}`
                            + `${Format.space(34)}`
                            + `${Emojis.crit.pub}, ${Emojis.block.pub}, ${Emojis.pip.pub}, ${Emojis.pcon.pub}`)
        .addField("\u200b", `${Emojis.heart.pub} **━ Heal Stats ━** ${Emojis.heart.pub} ${Format.space(11)} ${Emojis.luck.pub} **━ Misc Stats ━** ${Emojis.luck.pub}`
                            + `\n${Format.space(16)}${Emojis.inc.pub}, ${Emojis.out.pub}, ${Emojis.health.pub}`
                            + `${Format.space(43)}`
                            + `${Emojis.stunres.pub}, ${Emojis.luck.pub}, ${Emojis.mana.pub}`)
        .addField("\u200b", `${Emojis.round.pub} **━ Round Stats ━** ${Emojis.round.pub}`
                            + `\ndisplay stats like **in-game**\nand catch **fake** (${Emojis.fake.pub}) stats`)
        .addField("\u200b", update())
        .addField("\u200b", "\u200b")
        .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                        + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
        .setFooter(Format.footer.text, Format.footer.image);

    return menu;
}

function dataCheck(msg, args, prefix) {
    // if more or less than 5 arguments are provided
    if (args.length !== 5) {
        const amountEmbed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━━━━ ERROR ━━━━━━━━** :exclamation:")
            .setDescription(`You must enter **5 numbers** with the **${prefix} stats** command!
                            \n*\`You did not enter 5 numbers with the command\`*
                            \n${prefix} stats ${Emojis.str.pub} ${Emojis.int.pub} ${Emojis.agil.pub} ${Emojis.will.pub} ${Emojis.power.pub}
                            \n> **ex.**\n> ${prefix} stats 248 308 260 243 227`)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                            + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
            .setFooter(Format.footer.text, Format.footer.image);

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
                .setDescription(`You must enter **5 numbers** with the **${prefix} stats** command!
                                \n*\`You entered a non-number with the command\`*
                                \n${prefix} stats ${Emojis.str.pub} ${Emojis.int.pub} ${Emojis.agil.pub} ${Emojis.will.pub} ${Emojis.power.pub}
                                \n> **ex.**\n> ${prefix} stats 248 308 260 243 227`)
                .addField("\u200b", "\u200b")
                .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                            + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
                .setFooter(Format.footer.text, Format.footer.image);

            msg.channel.send(typeEmbed).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [non num entered error]", err));
            return false;
        
        // otherwise check bounds (highest selfish grant: +65 +50 +40 +40 +40 +25 = +260)
        } else if (str < 0 || str > 515 || int < 0 || int > 510 || agil < 0 || agil > 520 || will < 0 || will > 520 || power < 0 || power > 510) {
            const boundsEmbed = new Discord.MessageEmbed()
                .setColor("#DD2E44")
                .setTitle(":exclamation: **━━━━━━━━ ERROR ━━━━━━━━** :exclamation:")
                .setDescription(`You must enter **5 numbers** with the **${prefix} stats** command!
                                \n*\`You entered a stat that was either too big or too small\`*
                                \n${prefix} stats ${Emojis.str.pub} ${Emojis.int.pub} ${Emojis.agil.pub} ${Emojis.will.pub} ${Emojis.power.pub}
                                \n> **ex.**\n> ${prefix} stats 248 308 260 243 227`)
                .addField("\u200b", "\u200b")
                .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                            + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
                .setFooter(Format.footer.text, Format.footer.image);

            msg.channel.send(boundsEmbed).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "stats [out of bounds error]", err));
            return false;
        }
    }

    return true;
}

function update() {
    return `\n\n\n**:new: ━━ NEW UPDATE ━━ :new:**`
            + `\n▫️**\`prefix\`**: set a **custom prefix** for your server`
            + `\n▫️**\`formulas\`**: get all the formulas for the stats Kiwi displays`
            + `\n\nNew **universal prefix**: <@743944201682681937>`
            + `\n> **ex.** <@743944201682681937> stats 235 255 248 243 249`;
}