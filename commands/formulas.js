// require discord.js module
const Discord = require("discord.js");
// require emojis.js module
const Emojis = require("../utilities/emojis.js");
// require format.js module
const Format = require("../utilities/format.js");
// require mongo.js module
const Mongo = require("../utilities/mongo.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "formulas",
    description: "display the formulas for the talents Kiwi displays",
    async execute(bot, msg) {
        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));
        
        try {
            const sentMsg = await msg.channel.send(menu());

            page = "";

            // generate reactions
            sentMsg.react(bot.emojis.cache.get(Emojis.dmg.id));
            sentMsg.react(bot.emojis.cache.get(Emojis.crit.id));
            sentMsg.react(bot.emojis.cache.get(Emojis.heart.id));
            sentMsg.react(bot.emojis.cache.get(Emojis.luck.id));

            // reaction filters
            const baseFilter = (reaction, user) => reaction.emoji.id === Emojis.dmg.id && user.id === msg.author.id;
            const ratingFilter = (reaction, user) => reaction.emoji.id === Emojis.crit.id && user.id === msg.author.id;
            const healFilter = (reaction, user) => reaction.emoji.id === Emojis.heart.id && user.id === msg.author.id;
            const miscFilter = (reaction, user) => reaction.emoji.id === Emojis.luck.id && user.id === msg.author.id;

            // collectors (parse for 60 seconds)
            const baseCollector = sentMsg.createReactionCollector(baseFilter, {time: 60000});
            const ratingCollector = sentMsg.createReactionCollector(ratingFilter, {time: 60000});
            const healCollector = sentMsg.createReactionCollector(healFilter, {time: 60000});
            const miscCollector = sentMsg.createReactionCollector(miscFilter, {time: 60000});

            baseCollector.on("collect", 
                function() {
                    sentMsg.reactions.cache.get(Emojis.dmg.id).users.remove(msg.author);
                    resetTimer(baseCollector, ratingCollector, healCollector, miscCollector);
                    page = "base";

                    sentMsg.edit(base()).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "formulas [base]", err));
                }
            );

            ratingCollector.on("collect", 
                function() {
                    sentMsg.reactions.cache.get(Emojis.crit.id).users.remove(msg.author);
                    resetTimer(baseCollector, ratingCollector, healCollector, miscCollector);
                    page = "rating";

                    sentMsg.edit(rating()).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "formulas [rating]", err));
                }
            );

            healCollector.on("collect", 
                function() {
                    sentMsg.reactions.cache.get(Emojis.heart.id).users.remove(msg.author);
                    resetTimer(baseCollector, ratingCollector, healCollector, miscCollector);
                    page = "heal";

                    sentMsg.edit(healing()).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "formulas [healing]", err));
                }
            );

            miscCollector.on("collect", 
                function() {
                    sentMsg.reactions.cache.get(Emojis.luck.id).users.remove(msg.author);
                    resetTimer(baseCollector, ratingCollector, healCollector, miscCollector);
                    page = "misc";

                    sentMsg.edit(misc()).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "formulas [misc]", err));
                }
            );

            // edit message when reaction collectors expire
            miscCollector.on("end",
                function() {
                    switch (page) {
                        case "base":
                            sentMsg.edit("*The reaction menu on this message has expired*", base());
                            break;
                        case "rating":
                            sentMsg.edit("*The reaction menu on this message has expired*", rating());
                            break;
                        case "heal":
                            sentMsg.edit("*The reaction menu on this message has expired*", healing());
                            break;
                        case "misc":
                            sentMsg.edit("*The reaction menu on this message has expired*", misc());
                            break;
                        default:
                            sentMsg.edit("*The reaction menu on this message has expired*", menu());
                    }
                }
            );

        } catch (err) {
            ErrorLog.log(bot, msg, msg.guild.id, "formulas [reaction menu]", err);
        }

        // log command use
        Mongo.logCMD(bot, msg, msg.guild.id, "formulas");
    }
}

function resetTimer(base, rating, health, misc) {
    base.resetTimer({time: 60000});
    rating.resetTimer({time: 60000});
    health.resetTimer({time: 60000});
    misc.resetTimer({time: 60000});
}

function menu() {
    const menu = new Discord.MessageEmbed()
        .setColor("#D5AB88")
        .setTitle(`🧮${Format.space(1)} **━━━━━ TALENT FORMULAS ━━━━━** ${Format.space(1)}🧮`)
        .setDescription(`Use the reactions below to change pages`)
        .addField("\u200b", `${Emojis.dmg.pub} **━ Base Stats ━** ${Emojis.dmg.pub} ${Format.space(10)} ${Emojis.crit.pub} **━ Rating Stats ━** ${Emojis.crit.pub}`
                            + `\n${Format.space(10)}${Emojis.dmg.pub}, ${Emojis.res.pub}, ${Emojis.pierce.pub}, ${Emojis.acc.pub}`
                            + `${Format.space(34)}`
                            + `${Emojis.crit.pub}, ${Emojis.block.pub}, ${Emojis.pip.pub}, ${Emojis.pcon.pub}`)
        .addField("\u200b", `${Emojis.heart.pub} **━ Heal Stats ━** ${Emojis.heart.pub} ${Format.space(11)} ${Emojis.luck.pub} **━ Misc Stats ━** ${Emojis.luck.pub}`
                            + `\n${Format.space(16)}${Emojis.inc.pub}, ${Emojis.out.pub}, ${Emojis.health.pub}`
                            + `${Format.space(43)}`
                            + `${Emojis.stunres.pub}, ${Emojis.luck.pub}, ${Emojis.mana.pub}`)
        .addField("\u200b", "\u200b")
        .addField("\u200b", `[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
        .setFooter(Format.footer.text, Format.footer.image);

    return menu;
}

function base() {
    const str = Emojis.str.pub;
    const will = Emojis.will.pub;
    const int = Emojis.int.pub;
    const agil = Emojis.agil.pub;
    const power = Emojis.power.pub;
    const ice = Emojis.ice.pub;

    const embed = new Discord.MessageEmbed()
        .setColor("#ECC088")
        .setTitle(`${Emojis.dmg.pub} **━━━ BASE FORMULAS ━━━** ${Emojis.dmg.pub}`)
        .setDescription(`*${ice}**:** school based talent*`)
        .addField(`${Emojis.dmg.pub} ━━━━ DAMAGE ━━━━ ${Emojis.dmg.pub}`, 
                    `**${ice} Dealer:** [(2${str}+2${will}+${power})3] / 400`
                    + `\n**${ice} Giver:** ${Format.space(8)} (2${str}+2${will}+${power}) / 200`
                    + `\n**${ice} Boon:** ${Format.space(8)} (2${str}+2${will}+${power}) / 400`
                    + `\n**Pain-Giver:** ${Format.space(4)} (2${str}+2${will}+${power}) / 200`
                    + `\n**Pain-Bringer:** (2${str}+2${will}+${power}) / 400`)
        .addField(`${Emojis.res.pub} ━━━━━ RESIST ━━━━━ ${Emojis.res.pub}`,
                    `**${ice} Ward:** ${Format.space(2)} [(2${str}+2${agil}+${power})3] / 250`
                    + `\n**${ice} Proof:** ${Format.space(10)} (2${str}+2${agil}+${power}) / 125`
                    + `\n**${ice} Away:** ${Format.space(9)} (2${str}+2${agil}+${power}) / 250`
                    + `\n**Spell-Proof:** ${Format.space(5)} (2${str}+2${agil}+${power}) / 125`
                    + `\n**Spell-Defying:** (2${str}+2${agil}+${power}) / 250`)
        .addField(`${Emojis.acc.pub} ━━━━ ACCURACY ━━━━ ${Emojis.acc.pub}`, 
                    `**${ice} Sniper:** [(2${int}+2${agil}+${power})3] / 400`
                    + `\n**${ice} Shot:** ${Format.space(9)} (2${int}+2${agil}+${power}) / 200`
                    + `\n**${ice} Eye:** ${Format.space(12)} (2${int}+2${agil}+${power}) / 400`
                    + `\n**Sharp-Shot:** ${Format.space(3)} (2${int}+2${agil}+${power}) / 200`
                    + `\n**Sharp-Eye:** ${Format.space(4)} (2${int}+2${agil}+${power}) / 400`)
        .addField(`${Emojis.pierce.pub} ━━━━━━ PIERCE ━━━━━━ ${Emojis.pierce.pub}`, 
                    `**Armor Breaker:** ${Format.space(8)} (2${str}+2${agil}+${power}) / 400`
                    + `\n**Armor Piercer:** [(2${str}+2${agil}+${power})3] / 2000`)
        .addField("\u200b", "\u200b")
        .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                        + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
        .setFooter(Format.footer.text, Format.footer.image);

    return embed;
}

function rating() {
    const str = Emojis.str.pub;
    const will = Emojis.will.pub;
    const int = Emojis.int.pub;
    const agil = Emojis.agil.pub;
    const power = Emojis.power.pub;
    const myth = Emojis.myth.pub;
    
    const embed = new Discord.MessageEmbed()
        .setColor("#8648F7")
        .setTitle(`${Emojis.crit.pub} **━━ RATING FORMULAS ━━** ${Emojis.crit.pub}`)
        .setDescription(`*${myth}**:** school based talent*`)
        .addField(`${Emojis.crit.pub} ━━━━━ CRITICAL ━━━━━ ${Emojis.crit.pub}`, 
                    `**${myth} Assailant:** ${Format.space(11)} (2${agil}+2${will}+${power}) / 40`
                    + `\n**${myth} Striker:** ${Format.space(8)} [(2${agil}+2${will}+${power})3] / 150`
                    + `\n**Critical Striker:** [(2${agil}+2${will}+${power})3] / 125`
                    + `\n**Critical Hitter:** [(2${agil}+2${will}+${power})9] / 500`)
        .addField(`${Emojis.block.pub} ━━━━ BLOCK ━━━━ ${Emojis.block.pub}`, 
                    `**Defender:** [(2${int}+2${will}+${power})3] / 125`
                    + `\n**Blocker:** ${Format.space(2)} [(2${int}+2${will}+${power})9] / 500`)
        .addField(`${Emojis.pcon.pub} ━━━━ PIP CONVERT ━━━━ ${Emojis.pcon.pub}`, 
                    `**Pip Conserver:** [(2${agil}+2${will}+${power})3] / 125`
                    + `\n**Pip Saver:** ${Format.space(7)} [(2${agil}+2${will}+${power})9] / 500`)
        .addField(`${Emojis.pip.pub} ━━━━━━ PIPS ━━━━━━ ${Emojis.pip.pub}`, 
                    `**Pip 'O Plenty:** [(2${str}+2${int}+${power})3] / 250`
                    + `\n**Pip Boost:** N/A *(always 5%)*`)
        .addField("\u200b", "\u200b")
        .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                    + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
        .setFooter(Format.footer.text, Format.footer.image);

    return embed;
}

function healing() {
    const str = Emojis.str.pub;
    const will = Emojis.will.pub;
    const agil = Emojis.agil.pub;
    const power = Emojis.power.pub;

    const embed = new Discord.MessageEmbed()
        .setColor("#D41112")
        .setTitle(`${Emojis.heart.pub} **━━ HEALTH FORMULAS ━━** ${Emojis.heart.pub}`)
        .addField(`${Emojis.inc.pub} ━━━ INCOMING ━━━ ${Emojis.inc.pub}`, 
                    `**Lively:** ${Format.space(1)} [(2${str}+2${will}+${power})13] / 2000`
                    + `\n**Healthy:** [(2${str}+2${will}+${power})3] / 1000`)
        .addField(`${Emojis.out.pub} ━━━ OUTGOING ━━━ ${Emojis.out.pub}`, 
                    `**Medic:** [(2${str}+2${will}+${power})13] / 2000`
                    + `\n**Healer:** ${Format.space(1)} [(2${str}+2${will}+${power})3] / 1000`)
        .addField(`${Emojis.health.pub} ━━━━━ HEALTH ━━━━━ ${Emojis.health.pub}`, 
                    `**Health Bounty:** [(2${agil}+2${will}+${power})3] / 25`
                    + `\n**Health Gift:** ${Format.space(15)} (2${agil}+2${will}+${power}) / 10`
                    + `\n**Health Boost:** ${Format.space(2)} [(2${agil}+2${will}+${power})6] / 75`
                    + `\n**Health Add:** ${Format.space(6)} [(2${agil}+2${will}+${power})3] / 50`)
        .addField("\u200b", "\u200b")
        .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                    + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
        .setFooter(Format.footer.text, Format.footer.image);

    return embed;
}

function misc() {
    const str = Emojis.str.pub;
    const will = Emojis.will.pub;
    const int = Emojis.int.pub;
    const power = Emojis.power.pub;

    const embed = new Discord.MessageEmbed()
        .setColor("#E8932F")
        .setTitle(`${Emojis.luck.pub} **━━━ MISC FORMULAS ━━━** ${Emojis.luck.pub}`)
        .addField(`${Emojis.stunres.pub} ━━━━ STUN RESIST ━━━━ ${Emojis.stunres.pub}`, 
                    `**Stun Recalcitrant:** (2${str}+2${int}+${power}) / 125`
                    + `\n**Stun Resistant:** ${Format.space(4)} (2${str}+2${int}+${power}) / 250`)
        .addField(`${Emojis.luck.pub} ━━━━ FISH LUCK ━━━━ ${Emojis.luck.pub}`, 
                    `**Epic Fish Luck:** (2${int}+2${will}+${power}) / 400`
                    + `\n**Fish Luck:** ${Format.space(10)} (2${int}+2${will}+${power}) / 400`)
        .addField(`${Emojis.mana.pub} ━━━━━ MANA ━━━━━ ${Emojis.mana.pub}`, 
                    `**Mana Bounty:** ${Format.space(4)} (2${int}+2${will}+${power}) / 10`
                    + `\n**Mana Gift:** ${Format.space(4)} [(2${int}+2${will}+${power})6] / 75`
                    + `\n**Mana Boost:** [(2${int}+2${will}+${power})3] / 50`
                    + `\n**Extra Mana:** ${Format.space(7)} (2${int}+2${will}+${power}) / 25`)
        .addField("\u200b", "\u200b")
        .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                    + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
        .setFooter(Format.footer.text, Format.footer.image);

    return embed;
}