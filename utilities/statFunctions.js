// require discord.js module
const Discord = require("discord.js");
// require emojis.js module
const Emojis = require("../utilities/emojis.js");
// require format.js module
const Format = require("../utilities/format.js");

module.exports = {
    base(str, int, agil, will, power, round) {
        // damage, resist, accuracy, pierce
        const baseStats = generateBase(str, int, agil, will, power);

        // damage
        dealer = round ? roundVal(baseStats.dealer) : baseStats.dealer;
        giver = round ? roundVal(baseStats.giver) : baseStats.giver;
        boon = round ? roundVal(baseStats.boon) : baseStats.boon;
        alldmgTotal = round ? roundVal(baseStats.alldmgTotal) : baseStats.alldmgTotal;
        schoolDmgTotal = round ? roundVal(baseStats.schoolDmgTotal) : baseStats.schoolDmgTotal;
        universalDmgTotal = round ? roundVal(baseStats.universalDmgTotal) : baseStats.universalDmgTotal;

        // resist
        ward = round ? roundVal(baseStats.ward) : baseStats.ward;
        proof = round ? roundVal(baseStats.proof) : baseStats.proof;
        defy = round ? roundVal(baseStats.defy) : baseStats.defy;
        wardTotal = round ? roundVal(baseStats.wardTotal) : baseStats.wardTotal;
        proofDefyTotal = round ? roundVal(baseStats.proofDefyTotal) : baseStats.proofDefyTotal;

        // accuracy
        sniper = round ? roundVal(baseStats.sniper) : baseStats.sniper;
        shot = round ? roundVal(baseStats.shot) : baseStats.shot;
        eye = round ? roundVal(baseStats.eye) : baseStats.eye;
        schoolAccTotal = round ? roundVal(baseStats.schoolAccTotal) : baseStats.schoolAccTotal;
        universalAccTotal = round ? roundVal(baseStats.universalAccTotal) : baseStats.universalAccTotal;

        // pierce
        breaker = round ? roundVal(baseStats.breaker) : baseStats.breaker;
        piercer = round ? roundVal(baseStats.piercer) : baseStats.piercer;
        pierceTotal = round ? roundVal(baseStats.pierceTotal) : baseStats.pierceTotal;
        
        let description = `Your Stats:\n${Emojis.str.pub}: **${str}**/255 ${Format.space(2)}${Emojis.int.pub}: **${int}**/250 ${Format.space(2)}${Emojis.agil.pub}: **${agil}**/260 ${Format.space(2)}${Emojis.will.pub}: **${will}**/260 ${Format.space(2)}${Emojis.power.pub}: **${power}**/250`
                            + `\n\n*${Emojis.ice.pub}**:** school based talent*`;
        
        if (round)
            description += `${Format.space(1)}*${Emojis.fake.pub}**:** fake stat* ${Format.space(1)} ${Emojis.round.pub}${Format.space(1)} **Rounding Enabled!**\n`;

        const embed = new Discord.MessageEmbed()
            .setColor("#ECC088")
            .setTitle(`${Emojis.dmg.pub} **━━━━━━━━ BASE PET STATS ━━━━━━━━** ${Emojis.dmg.pub}`)
            .setDescription(description)
            .addField(`${Emojis.dmg.pub} ━━ DAMAGE ━━ ${Emojis.dmg.pub}`, 
                        `*boosted by: ${Emojis.str.pub} & ${Format.space(1)}${Emojis.will.pub}*`
                        + `\n**${Emojis.ice.pub} Dealer:** ${Format.space(1)} ${dealer}% ${Emojis.ice.pub}${Emojis.dmg.pub}`
                        + `\n**${Emojis.ice.pub} Giver:** ${Format.space(4)} ${giver}% ${Emojis.ice.pub}${Emojis.dmg.pub}`
                        + `\n**${Emojis.ice.pub} Boon:** ${Format.space(5)} ${boon}% ${Emojis.ice.pub}${Emojis.dmg.pub}`
                        + `\n**Pain-Giver:** ${Format.space(6)} ${giver}% ${Emojis.dmg.pub}`
                        + `\n**Pain-Bringer:** ${Format.space(2)} ${boon}% ${Emojis.dmg.pub}`
                        + `\n\`Totals:\``
                        + `\n${alldmgTotal}% **|** ${schoolDmgTotal}% **|** ${universalDmgTotal}% ${Emojis.dmg.pub}`, true)
            .addField(`${Emojis.res.pub} ━━━ RESIST ━━━ ${Emojis.res.pub}`, 
                        `*boosted by: ${Emojis.str.pub} & ${Format.space(1)}${Emojis.agil.pub}*`
                        + `\n**${Emojis.ice.pub} Ward:** ${Format.space(2)} ${ward}% ${Emojis.ice.pub}${Emojis.res.pub}`
                        + `\n**${Emojis.ice.pub} Proof:** ${Format.space(2)} ${proof}% ${Emojis.ice.pub}${Emojis.res.pub}`
                        + `\n**${Emojis.ice.pub} Away:** ${Format.space(5)} ${defy}% ${Emojis.ice.pub}${Emojis.res.pub}`
                        + `\n**Spell-Proof:** ${Format.space(3)} ${proof}% ${Emojis.res.pub}`
                        + `\n**Spell-Defying:** ${Format.space(1)} ${defy}% ${Emojis.res.pub}`
                        + `\n\`Totals:\``
                        + `\n${wardTotal}% ${Emojis.ice.pub}${Emojis.res.pub} **|** ${proofDefyTotal}% ${Emojis.res.pub}`, true)
            .addField("\u200b", "\u200b")
            .addField(`${Emojis.acc.pub} ━━ ACCURACY ━━ ${Emojis.acc.pub}`, 
                        `*boosted by: ${Emojis.int.pub} & ${Format.space(1)}${Emojis.agil.pub}*`
                        + `\n**${Emojis.ice.pub} Sniper:** ${sniper}% ${Emojis.ice.pub}${Emojis.acc.pub}`
                        + `\n**${Emojis.ice.pub} Shot:** ${Format.space(6)} ${shot}% ${Emojis.ice.pub}${Emojis.acc.pub}`
                        + `\n**${Emojis.ice.pub} Eye:** ${Format.space(6)} ${eye}% ${Emojis.ice.pub}${Emojis.acc.pub}`
                        + `\n**Sharp-Shot:** ${Format.space(5)} ${shot}% ${Emojis.acc.pub}`
                        + `\n**Sharp-Eye:** ${Format.space(6)} ${eye}% ${Emojis.acc.pub}`
                        + `\n\`Totals:\``
                        + `\n${schoolAccTotal}% ${Emojis.ice.pub}${Emojis.acc.pub} **|** ${universalAccTotal}% ${Emojis.acc.pub}`, true)
            .addField(`${Emojis.pierce.pub} ━━━ PIERCE ━━━ ${Emojis.pierce.pub}`, 
                        `*boosted by: ${Emojis.str.pub} & ${Format.space(1)}${Emojis.agil.pub}*`
                        + `\n**Armor Breaker:** ${Format.space(2)} ${breaker}% ${Emojis.pierce.pub}`
                        + `\n**Armor Piercer:** ${Format.space(1)} ${piercer}% ${Emojis.pierce.pub}`
                        + `\n\`Total:\` ${pierceTotal}% ${Emojis.pierce.pub}`, true)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                            + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
            .setFooter(Format.footer.text, Format.footer.image);

        return embed;
    },
    rating(str, int, agil, will, power, round) {
        // critical, block, pip convert, pips
        const ratingStats = generateRating(str, int, agil, will, power);

        // critical
        assailant = round ? roundVal(ratingStats.assailant) : ratingStats.assailant;
        sStriker = round ? roundVal(ratingStats.sStriker) : ratingStats.sStriker;
        cStriker = round ? roundVal(ratingStats.cStriker) : ratingStats.cStriker;
        hitter = round ? roundVal(ratingStats.hitter) : ratingStats.hitter;
        allCritTotal = round ? roundVal(ratingStats.allCritTotal) : ratingStats.allCritTotal;
        schoolCritTotal = round ? roundVal(ratingStats.schoolCritTotal) : ratingStats.schoolCritTotal;
        universalCritTotal = round ? roundVal(ratingStats.universalCritTotal) : ratingStats.universalCritTotal;
        
        // block
        defender = round ? roundVal(ratingStats.defender) : ratingStats.defender;
        blocker = round ? roundVal(ratingStats.blocker) : ratingStats.blocker;
        blockTotal = round ? roundVal(ratingStats.blockTotal) : ratingStats.blockTotal;
        
        // pip convert
        conserver = round ? roundVal(ratingStats.conserver) : ratingStats.conserver;
        saver = round ? roundVal(ratingStats.saver) : ratingStats.saver;
        pconTotal = round ? roundVal(ratingStats.pconTotal) : ratingStats.pconTotal;
        
        // pips
        oplenty = round ? roundVal(ratingStats.oplenty) : ratingStats.oplenty;
        pipTotal = round ? roundVal(ratingStats.pipTotal) : ratingStats.pipTotal;

        let description = `Your Stats:\n${Emojis.str.pub}: **${str}**/255 ${Format.space(2)}${Emojis.int.pub}: **${int}**/250 ${Format.space(2)}${Emojis.agil.pub}: **${agil}**/260 ${Format.space(2)}${Emojis.will.pub}: **${will}**/260 ${Format.space(2)}${Emojis.power.pub}: **${power}**/250`
                            + `\n\n*${Emojis.myth.pub}**:** school based talent*`;
        
        if (round)
            description += `${Format.space(1)}*${Emojis.fake.pub}**:** fake stat* ${Format.space(1)} ${Emojis.round.pub}${Format.space(1)} **Rounding Enabled!**\n`;

        const embed = new Discord.MessageEmbed()
            .setColor("#8648F7")
            .setTitle(`${Emojis.crit.pub} **━━━━━━━ RATING PET STATS ━━━━━━━** ${Emojis.crit.pub}`)
            .setDescription(description)
            .addField(`${Emojis.crit.pub} ━━ CRITICAL ━━ ${Emojis.crit.pub}`, 
                        `*boosted by: ${Emojis.agil.pub} & ${Format.space(1)}${Emojis.will.pub}*`
                        + `\n**${Emojis.myth.pub} Assailant:** +${assailant} ${Emojis.myth.pub}${Emojis.crit.pub}`
                        + `\n**${Emojis.myth.pub} Striker:** ${Format.space(7)} +${sStriker} ${Emojis.myth.pub}${Emojis.crit.pub}`
                        + `\n**Critical Striker:**  ${Format.space(1)} +${cStriker} ${Emojis.crit.pub}`
                        + `\n**Critical Hitter:** ${Format.space(3)} +${hitter} ${Emojis.crit.pub}`
                        + `\n\`Totals:\``
                        + `\n+${allCritTotal} **|** +${schoolCritTotal} **|** +${universalCritTotal} ${Emojis.crit.pub}`, true)
            .addField(`${Emojis.block.pub} ━━ BLOCK ━━ ${Emojis.block.pub}`, 
                        `*boosted by: ${Emojis.int.pub} & ${Format.space(1)}${Emojis.will.pub}*`
                        + `\n**Defender:** ${Format.space(1)} +${defender} ${Emojis.block.pub}`
                        + `\n**Blocker:** ${Format.space(5)} +${blocker} ${Emojis.block.pub}`
                        + `\n\`Total:\` +${blockTotal} ${Emojis.block.pub}`, true)
            .addField("\u200b", "\u200b")
            .addField(`${Emojis.pcon.pub} ━ PIP CONVERT ━ ${Emojis.pcon.pub}`, 
                        `*boosted by: ${Emojis.agil.pub} & ${Format.space(1)}${Emojis.will.pub}*`
                        + `\n**Pip Conserver:** +${conserver} ${Emojis.pcon.pub}`
                        + `\n**Pip Saver:** ${Format.space(10)} +${saver} ${Emojis.pcon.pub}`
                        + `\n\`Total:\` +${pconTotal} ${Emojis.pcon.pub}`, true)
            .addField(`${Emojis.pip.pub} ━━━ PIPS ━━━ ${Emojis.pip.pub}`, 
                        `*boosted by: ${Emojis.str.pub} & ${Format.space(1)}${Emojis.int.pub}*`
                        + `\n**Pip 'O Plenty:** ${Format.space(1)} ${oplenty}% ${Emojis.pip.pub}`
                        + `\n**Pip Boost:** 5% ${Emojis.pip.pub}`
                        + `\n\`Total:\` ${pipTotal}% ${Emojis.pip.pub}`, true)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                        + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
            .setFooter(Format.footer.text, Format.footer.image);

        return embed;
    },
    healing(str, int, agil, will, power, round) {
        // incoming, outgoing, health
        const healthStats = generateHealth(str, int, agil, will, power);

        // incoming
        lively = round ? roundVal(healthStats.lively) : healthStats.lively;
        healthy = round ? roundVal(healthStats.healthy) : healthStats.healthy;
        incTotal = round ? roundVal(healthStats.incTotal) : healthStats.incTotal;
        
        // outgoing
        medic = round ? roundVal(healthStats.medic) : healthStats.medic;
        healer = round ? roundVal(healthStats.healer) : healthStats.healer;
        outTotal = round ? roundVal(healthStats.outTotal) : healthStats.outTotal;
        
        // health
        bounty = round ? roundVal(healthStats.bounty) : healthStats.bounty;
        gift = round ? roundVal(healthStats.gift) : healthStats.gift;
        boost = round ? roundVal(healthStats.boost) : healthStats.boost;
        add = round ? roundVal(healthStats.add) : healthStats.add;
        healthTotal = round ? roundVal(healthStats.healthTotal) : healthStats.healthTotal;

        let description = `Your Stats:\n${Emojis.str.pub}: **${str}**/255 ${Format.space(2)}${Emojis.int.pub}: **${int}**/250 ${Format.space(2)}${Emojis.agil.pub}: **${agil}**/260 ${Format.space(2)}${Emojis.will.pub}: **${will}**/260 ${Format.space(2)}${Emojis.power.pub}: **${power}**/250\n${Format.emptyChar}`;
        
        if (round)
            description += `\n${Format.space(1)}*${Emojis.fake.pub}**:** fake stat* ${Format.space(1)} ${Emojis.round.pub}${Format.space(1)} **Rounding Enabled!**\n`;

        const embed = new Discord.MessageEmbed()
            .setColor("#D41112")
            .setTitle(`${Emojis.heart.pub} **━━━━━━━ HEALTH PET STATS ━━━━━━━** ${Emojis.heart.pub}`)
            .setDescription(description)
            .addField(`${Emojis.inc.pub} ━━ INCOMING ━━ ${Emojis.inc.pub}`, 
                        `*boosted by: ${Emojis.str.pub} & ${Format.space(1)}${Emojis.will.pub}*`
                        + `\n**Lively:** ${Format.space(6)} ${lively}% ${Emojis.inc.pub}${Emojis.heart.pub}`
                        + `\n**Healthy:** ${Format.space(1)} ${healthy}% ${Emojis.inc.pub}${Emojis.heart.pub}`
                        + `\n\`Total:\` ${incTotal}% ${Emojis.inc.pub}${Emojis.heart.pub}`, true)
            .addField(`${Emojis.out.pub} ━━ OUTGOING ━━ ${Emojis.out.pub}`, 
                        `*boosted by: ${Emojis.str.pub} & ${Format.space(1)}${Emojis.will.pub}*`
                        + `\n**Medic:** ${Format.space(3)} ${medic}% ${Emojis.out.pub}${Emojis.heart.pub}`
                        + `\n**Healer:** ${Format.space(1)} ${healer}% ${Emojis.out.pub}${Emojis.heart.pub}`
                        + `\n\`Total:\` ${outTotal}% ${Emojis.out.pub}${Emojis.heart.pub}`, true)
            .addField("\u200b", "\u200b")
            .addField(`${Emojis.health.pub} ━━ HEALTH ━━ ${Emojis.health.pub}`, 
                        `*boosted by: ${Emojis.agil.pub} & ${Format.space(1)}${Emojis.will.pub}*`
                        + `\n**Health Bounty:** +${bounty} ${Emojis.health.pub}`
                        + `\n**Health Gift:** ${Format.space(11)} +${gift} ${Emojis.health.pub}`
                        + `\n**Health Boost:** ${Format.space(2)} +${boost} ${Emojis.health.pub}`
                        + `\n**Health Add:** ${Format.space(8)} +${add} ${Emojis.health.pub}`
                        + `\n\`Total:\` +${healthTotal} ${Emojis.health.pub}`, true)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                        + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
            .setFooter(Format.footer.text, Format.footer.image);

        return embed;
    },
    misc(str, int, agil, will, power, round) {
        // stun resist, fish luck, mana
        const miscStats = generateMisc(str, int, agil, will, power);

        // stun resist
        recalcitrant = round ? roundVal(miscStats.recalcitrant) : miscStats.recalcitrant;
        resistant = round ? roundVal(miscStats.resistant) : miscStats.resistant;
        stunTotal = round ? roundVal(miscStats.stunTotal) : miscStats.stunTotal;
        
        // fish luck
        epicluck = round ? roundVal(miscStats.epicluck) : miscStats.epicluck;
        luck = round ? roundVal(miscStats.luck) : miscStats.luck;
        luckTotal = round ? roundVal(miscStats.luckTotal) : miscStats.luckTotal;
        
        // mana
        bounty = round ? roundVal(miscStats.bounty) : miscStats.bounty;
        gift = round ? roundVal(miscStats.gift) : miscStats.gift;
        boost = round ? roundVal(miscStats.boost) : miscStats.boost;
        extra = round ? roundVal(miscStats.extra) : miscStats.extra;
        manaTotal = round ? roundVal(miscStats.manaTotal) : miscStats.manaTotal;

        let description = `Your Stats:\n${Emojis.str.pub}: **${str}**/255 ${Format.space(2)}${Emojis.int.pub}: **${int}**/250 ${Format.space(2)}${Emojis.agil.pub}: **${agil}**/260 ${Format.space(2)}${Emojis.will.pub}: **${will}**/260 ${Format.space(2)}${Emojis.power.pub}: **${power}**/250\n${Format.emptyChar}`;
        
        if (round)
            description += `\n${Format.space(1)}*${Emojis.fake.pub}**:** fake stat* ${Format.space(1)} ${Emojis.round.pub}${Format.space(1)} **Rounding Enabled!**\n`;

        const embed = new Discord.MessageEmbed()
            .setColor("#E8932F")
            .setTitle(`${Emojis.luck.pub} **━━━━━━━ MISC PET STATS ━━━━━━━** ${Emojis.luck.pub}`)
            .setDescription(description)
            .addField(`${Emojis.stunres.pub} ━━ STUN RESIST ━━ ${Emojis.stunres.pub}`, 
                        `*boosted by: ${Emojis.str.pub} & ${Format.space(1)}${Emojis.int.pub}*`
                        + `\n**Stun Recalcitrant:** ${recalcitrant}% ${Emojis.stunres.pub}`
                        + `\n**Stun Resistant:** ${Format.space(5)} ${resistant}% ${Emojis.stunres.pub}`
                        + `\n\`Total:\` ${stunTotal}% ${Emojis.stunres.pub}`, true)
            .addField(`${Emojis.luck.pub} ━━ FISH LUCK ━━ ${Emojis.luck.pub}`, 
                        `*boosted by: ${Emojis.int.pub} & ${Format.space(1)}${Emojis.will.pub}*`
                        + `\n**Epic Fish Luck:** ${epicluck}% ${Emojis.luck.pub}`
                        + `\n**Fish Luck:** ${Format.space(10)} ${luck}% ${Emojis.luck.pub}`
                        + `\n\`Total:\` ${luckTotal}% ${Emojis.luck.pub}`, true)
            .addField("\u200b", "\u200b")
            .addField(`${Emojis.mana.pub} ━━━ MANA ━━━ ${Emojis.mana.pub}`, 
                        `*boosted by: ${Emojis.int.pub} & ${Format.space(1)}${Emojis.will.pub}*`
                        + `\n**Mana Bounty:** ${Format.space(1)} +${bounty} ${Emojis.mana.pub}`
                        + `\n**Mana Gift:** ${Format.space(6)} +${gift} ${Emojis.mana.pub}`
                        + `\n**Mana Boost:** ${Format.space(3)} +${boost} ${Emojis.mana.pub}`
                        + `\n**Extra Mana:** ${Format.space(4)} +${extra} ${Emojis.mana.pub}`
                        + `\n\`Total:\` +${manaTotal} ${Emojis.mana.pub}`, true)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                        + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
            .setFooter(Format.footer.text, Format.footer.image);

        return embed;
    }
}

function fake(val) {
    let decimals =  (val % 1).toFixed(4);

    // fake range is 0.5 - 0.549
    if (0.49 < decimals && decimals < 0.55)
        return true;
    else
        return false;
}

function roundVal(val) {
    // if val < 1
    if (val < 1)
        return 1;

    // otherwise, if the value is fake
    if (fake(val))
        return `${Emojis.fake.pub}${Math.round(val)}`;
    else
        return Math.round(val);
}

function generateBase(str, int, agil, will, power) {
    let baseStats = {
        // damage 10% 6% 3% | 6% 3%
        dealer: parseFloat((((2 * str) + (2 * will) + power) * 3) / 400),
        giver: parseFloat(((2 * str) + (2 * will) + power) / 200),
        boon: parseFloat(((2 * str) + (2 * will) + power) / 400),
        alldmgTotal: 0,
        schoolDmgTotal: 0,
        universalDmgTotal: 0,

        // resist 15% 10% 5% | 10% 5%
        ward: (((2 * str) + (2 * agil) + power) * 3) / 250,
        proof: ((2 * str) + (2 * agil) + power) / 125,
        defy: ((2 * str) + (2 * agil) + power) / 250,
        wardTotal: 0,
        proofDefyTotal: 0,

        // accuracy 13% 9% 4% | 9% 4%
        sniper: (((2 * int) + (2 * agil) + power) * 3) / 400,
        shot: ((2 * int) + (2 * agil) + power) / 200,
        eye: ((2 * int) + (2 * agil) + power) / 400,
        schoolAccTotal: 0,
        universalAccTotal: 0,

        // pierce 3% 2%
        breaker: ((2 * str) + (2 * agil) + power) / 400,
        piercer: (((2 * str) + (2 * agil) + power) * 3) / 2000,
        pierceTotal: 0
    };

    baseStats.alldmgTotal = Math.round((baseStats.dealer + baseStats.giver + baseStats.boon + baseStats.giver + baseStats.boon + Number.EPSILON) * 100) / 100;
    baseStats.schoolDmgTotal = Math.round((baseStats.dealer + baseStats.giver + baseStats.boon + Number.EPSILON) * 100) / 100;
    baseStats.universalDmgTotal = Math.round((baseStats.giver + baseStats.boon + Number.EPSILON) * 100) / 100;

    baseStats.wardTotal = Math.round((baseStats.ward + baseStats.proof + baseStats.defy + Number.EPSILON) * 100) / 100;
    baseStats.proofDefyTotal = Math.round((baseStats.proof + baseStats.defy + Number.EPSILON) * 100) / 100;

    baseStats.schoolAccTotal = Math.round((baseStats.sniper + baseStats.shot + baseStats.eye + Number.EPSILON) * 100) / 100;
    baseStats.universalAccTotal = Math.round((baseStats.shot + baseStats.eye + Number.EPSILON) * 100) / 100;

    baseStats.pierceTotal = Math.round((baseStats.breaker + baseStats.piercer + Number.EPSILON) * 100) / 100;

    return baseStats;
}

function generateRating(str, int, agil, will, power) {
    let ratingStats = {
        // critical 32 26 | 31 23
        assailant: ((2 * agil) + (2 * will) + power) / 40,
        sStriker: ((2 * agil) + (2 * will) + power) * 3 / 150,
        cStriker: ((2 * agil) + (2 * will) + power) * 3 / 125,
        hitter: ((2 * agil) + (2 * will) + power) * 9 / 500,
        allCritTotal: 0,
        schoolCritTotal: 0,
        universalCritTotal: 0,

        // block 30 25
        defender: ((2 * int) + (2 * will) + power) * 3 / 125,
        blocker: ((2 * int) + (2 * will) + power) * 9 / 500,
        blockTotal: 0,

        // pip conversion 30 25
        conserver: ((2 * agil) + (2 * will) + power) * 3 / 125,
        saver: ((2 * agil) + (2 * will) + power) * 9 / 500,
        pconTotal: 0,

        // pip chance 5%
        oplenty: ((2 * str) + (2 * int) + power) / 250,
        pipTotal: 0
    };

    ratingStats.allCritTotal = Math.round((ratingStats.assailant + ratingStats.sStriker + ratingStats.cStriker + ratingStats.hitter + Number.EPSILON) * 100) / 100;
    ratingStats.schoolCritTotal = Math.round((ratingStats.assailant + ratingStats.sStriker + Number.EPSILON) * 100) / 100;
    ratingStats.universalCritTotal = Math.round((ratingStats.cStriker + ratingStats.hitter + Number.EPSILON) * 100) / 100;

    ratingStats.blockTotal = Math.round((ratingStats.defender + ratingStats.blocker + Number.EPSILON) * 100) / 100;

    ratingStats.pconTotal = Math.round((ratingStats.conserver + ratingStats.saver + Number.EPSILON) * 100) / 100;

    ratingStats.pipTotal = Math.round((ratingStats.oplenty + 5 + Number.EPSILON) * 100) / 100;

    return ratingStats;
}

function generateHealth(str, int, agil, will, power) {
    let healthStats = {
        // incoming 8% 4%
        lively: ((2 * str) + (2 * will) + power) * 13 / 2000,
        healthy: ((2 * str) + (2 * will) + power) * 3 / 1000,
        incTotal: 0,

        // outgoing 8% 4%
        medic: ((2 * str) + (2 * will) + power) * 13 / 2000,
        healer: ((2 * str) + (2 * will) + power) * 3 / 1000,
        outTotal: 0,

        // health 150 125 100 75
        bounty: ((2 * agil) + (2 * will) + power) * 3 / 25,
        gift: ((2 * agil) + (2 * will) + power) / 10,
        boost: ((2 * agil) + (2 * will) + power) * 6 / 75,
        add: ((2 * agil) + (2 * will) + power) * 3 / 50,
        healthTotal: 0

    };

    healthStats.incTotal = Math.round((healthStats.lively + healthStats.healthy + Number.EPSILON) * 100) / 100;

    healthStats.outTotal = Math.round((healthStats.medic + healthStats.healer + Number.EPSILON) * 100) / 100;

    healthStats.healthTotal = Math.round((healthStats.bounty + healthStats.gift + healthStats.boost + healthStats.add + Number.EPSILON) * 100) / 100;

    return healthStats;
}

function generateMisc(str, int, agil, will, power) {
    let miscStats = {
        // stun 10% 7%
        recalcitrant: ((2 * str) + (2 * int) + power) / 125,
        resistant: ((2 * str) + (2 * int) + power) / 250,
        stunTotal: 0,

        // fish luck 3% 3%
        epicluck: ((2 * int) + (2 * will) + power) / 400,
        luck: ((2 * int) + (2 * will) + power) / 400,
        luckTotal: 0,

        // mana 125 100 75 50
        bounty: ((2 * int) + (2 * will) + power) / 10,
        gift: ((2 * int) + (2 * will) + power) * 6 / 75,
        boost: ((2 * int) + (2 * will) + power) * 3 / 50,
        extra: ((2 * int) + (2 * will) + power) / 25,
        manaTotal: 0
    };

    miscStats.stunTotal = Math.round((miscStats.recalcitrant + miscStats.resistant + Number.EPSILON) * 100) / 100;

    miscStats.luckTotal = Math.round((miscStats.epicluck + miscStats.luck + Number.EPSILON) * 100) / 100;

    miscStats.manaTotal = Math.round((miscStats.bounty + miscStats.gift + miscStats.boost + miscStats.extra + Number.EPSILON) * 100) / 100;

    return miscStats;
}