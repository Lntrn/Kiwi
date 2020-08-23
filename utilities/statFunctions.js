// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("./data.js");
// require statData.js module
const StatData = require("./statData.js");

module.exports = {
    base(str, int, agil, will, power, round) {
        // damage, resist, accuracy, pierce

        if (!StatData.baseStats.generated)
            StatData.generateBase(str, int, agil, will, power);

        // damage
        dealer = round ? module.exports.round(StatData.baseStats.dealer) : StatData.baseStats.dealer;
        giver = round ? module.exports.round(StatData.baseStats.giver) : StatData.baseStats.giver;
        boon = round ? module.exports.round(StatData.baseStats.boon) : StatData.baseStats.boon;
        alldmgTotal = round ? module.exports.round(StatData.baseStats.alldmgTotal) : StatData.baseStats.alldmgTotal;
        schoolDmgTotal = round ? module.exports.round(StatData.baseStats.schoolDmgTotal) : StatData.baseStats.schoolDmgTotal;
        universalDmgTotal = round ? module.exports.round(StatData.baseStats.universalDmgTotal) : StatData.baseStats.universalDmgTotal;

        // resist
        ward = round ? module.exports.round(StatData.baseStats.ward) : StatData.baseStats.ward;
        proof = round ? module.exports.round(StatData.baseStats.proof) : StatData.baseStats.proof;
        defy = round ? module.exports.round(StatData.baseStats.defy) : StatData.baseStats.defy;
        wardTotal = round ? module.exports.round(StatData.baseStats.wardTotal) : StatData.baseStats.wardTotal;
        proofDefyTotal = round ? module.exports.round(StatData.baseStats.proofDefyTotal) : StatData.baseStats.proofDefyTotal;

        // accuracy
        sniper = round ? module.exports.round(StatData.baseStats.sniper) : StatData.baseStats.sniper;
        shot = round ? module.exports.round(StatData.baseStats.shot) : StatData.baseStats.shot;
        eye = round ? module.exports.round(StatData.baseStats.eye) : StatData.baseStats.eye;
        schoolAccTotal = round ? module.exports.round(StatData.baseStats.schoolAccTotal) : StatData.baseStats.schoolAccTotal;
        universalAccTotal = round ? module.exports.round(StatData.baseStats.universalAccTotal) : StatData.baseStats.universalAccTotal;

        // pierce
        breaker = round ? module.exports.round(StatData.baseStats.breaker) : StatData.baseStats.breaker;
        piercer = round ? module.exports.round(StatData.baseStats.piercer) : StatData.baseStats.piercer;
        pierceTotal = round ? module.exports.round(StatData.baseStats.pierceTotal) : StatData.baseStats.pierceTotal;
        
        let description = `Your Stats:\n${Data.emojis.str}: **${str}**/255 ${Data.space(2)}${Data.emojis.int}: **${int}**/250 ${Data.space(2)}${Data.emojis.agil}: **${agil}**/260 ${Data.space(2)}${Data.emojis.will}: **${will}**/260 ${Data.space(2)}${Data.emojis.power}: **${power}**/250`
                            + `\n\n*${Data.emojis.ice}**:** school based talent*`;
        
        if (round)
            description += `${Data.space(1)}*${Data.emojis.fake}**:** fake stat* ${Data.space(1)} ${Data.emojis.round}${Data.space(1)} **Rounding Enabled!**\n`;

        const embed = new Discord.MessageEmbed()
            .setColor("#ECC088")
            .setTitle(`${Data.emojis.dmg} **━━━━━━━━ BASE PET STATS ━━━━━━━━** ${Data.emojis.dmg}`)
            .setDescription(description)
            .addField(`${Data.emojis.dmg} ━━ DAMAGE ━━ ${Data.emojis.dmg}`, 
                        `*boosted by: ${Data.emojis.str} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**${Data.emojis.ice} Dealer:** ${Data.space(1)} ${dealer}% ${Data.emojis.ice}${Data.emojis.dmg}`
                        + `\n**${Data.emojis.ice} Giver:** ${Data.space(4)} ${giver}% ${Data.emojis.ice}${Data.emojis.dmg}`
                        + `\n**${Data.emojis.ice} Boon:** ${Data.space(5)} ${boon}% ${Data.emojis.ice}${Data.emojis.dmg}`
                        + `\n**Pain-Giver:** ${Data.space(6)} ${giver}% ${Data.emojis.dmg}`
                        + `\n**Pain-Bringer:** ${Data.space(2)} ${boon}% ${Data.emojis.dmg}`
                        + `\nTotals:`
                        + `\n${alldmgTotal}% **|** ${schoolDmgTotal}% **|** ${universalDmgTotal}% ${Data.emojis.dmg}`, true)
            .addField(`${Data.emojis.res} ━━━ RESIST ━━━ ${Data.emojis.res}`, 
                        `*boosted by: ${Data.emojis.str} & ${Data.space(1)}${Data.emojis.agil}*`
                        + `\n**${Data.emojis.ice} Ward:** ${Data.space(2)} ${ward}% ${Data.emojis.ice}${Data.emojis.res}`
                        + `\n**${Data.emojis.ice} Proof:** ${Data.space(2)} ${proof}% ${Data.emojis.ice}${Data.emojis.res}`
                        + `\n**${Data.emojis.ice} Away:** ${Data.space(5)} ${defy}% ${Data.emojis.ice}${Data.emojis.res}`
                        + `\n**Spell-Proof:** ${Data.space(3)} ${proof}% ${Data.emojis.res}`
                        + `\n**Spell-Defying:** ${Data.space(1)} ${defy}% ${Data.emojis.res}`
                        + `\nTotals:`
                        + `\n${wardTotal}% ${Data.emojis.ice}${Data.emojis.res} **|** ${proofDefyTotal}% ${Data.emojis.res}`, true)
            .addField("\u200b", "\u200b")
            .addField(`${Data.emojis.acc} ━━ ACCURACY ━━ ${Data.emojis.acc}`, 
                        `*boosted by: ${Data.emojis.int} & ${Data.space(1)}${Data.emojis.agil}*`
                        + `\n**${Data.emojis.ice} Sniper:** ${sniper}% ${Data.emojis.ice}${Data.emojis.acc}`
                        + `\n**${Data.emojis.ice} Shot:** ${Data.space(6)} ${shot}% ${Data.emojis.ice}${Data.emojis.acc}`
                        + `\n**${Data.emojis.ice} Eye:** ${Data.space(6)} ${eye}% ${Data.emojis.ice}${Data.emojis.acc}`
                        + `\n**Sharp-Shot:** ${Data.space(5)} ${shot}% ${Data.emojis.acc}`
                        + `\n**Sharp-Eye:** ${Data.space(6)} ${eye}% ${Data.emojis.acc}`
                        + `\nTotals:`
                        + `\n${schoolAccTotal}% ${Data.emojis.ice}${Data.emojis.acc} **|** ${universalAccTotal}% ${Data.emojis.acc}`, true)
            .addField(`${Data.emojis.pierce} ━━━ PIERCE ━━━ ${Data.emojis.pierce}`, 
                        `*boosted by: ${Data.emojis.str} & ${Data.space(1)}${Data.emojis.agil}*`
                        + `\n**Armor Breaker:** ${Data.space(2)} ${breaker}% ${Data.emojis.pierce}`
                        + `\n**Armor Piercer:** ${Data.space(1)} ${piercer}% ${Data.emojis.pierce}`
                        + `\nTotal: ${pierceTotal}% ${Data.emojis.pierce}`, true)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**Invite Kiwi!**](${Data.inviteLink}) ${Data.emojis.kiwi}`)
            .setFooter(Data.footer.footer, Data.footer.image);

        return embed;
    },
    rating(str, int, agil, will, power, round) {
        // critical, block, pip convert, pips

        if (!StatData.ratingStats.generated)
            StatData.generateRating(str, int, agil, will, power);

        // critical
        assailant = round ? module.exports.round(StatData.ratingStats.assailant) : StatData.ratingStats.assailant;
        sStriker = round ? module.exports.round(StatData.ratingStats.sStriker) : StatData.ratingStats.sStriker;
        cStriker = round ? module.exports.round(StatData.ratingStats.cStriker) : StatData.ratingStats.cStriker;
        hitter = round ? module.exports.round(StatData.ratingStats.hitter) : StatData.ratingStats.hitter;
        allCritTotal = round ? module.exports.round(StatData.ratingStats.allCritTotal) : StatData.ratingStats.allCritTotal;
        schoolCritTotal = round ? module.exports.round(StatData.ratingStats.schoolCritTotal) : StatData.ratingStats.schoolCritTotal;
        universalCritTotal = round ? module.exports.round(StatData.ratingStats.universalCritTotal) : StatData.ratingStats.universalCritTotal;
        
        // block
        defender = round ? module.exports.round(StatData.ratingStats.defender) : StatData.ratingStats.defender;
        blocker = round ? module.exports.round(StatData.ratingStats.blocker) : StatData.ratingStats.blocker;
        blockTotal = round ? module.exports.round(StatData.ratingStats.blockTotal) : StatData.ratingStats.blockTotal;
        
        // pip convert
        conserver = round ? module.exports.round(StatData.ratingStats.conserver) : StatData.ratingStats.conserver;
        saver = round ? module.exports.round(StatData.ratingStats.saver) : StatData.ratingStats.saver;
        pconTotal = round ? module.exports.round(StatData.ratingStats.pconTotal) : StatData.ratingStats.pconTotal;
        
        // pips
        oplenty = round ? module.exports.round(StatData.ratingStats.oplenty) : StatData.ratingStats.oplenty;
        pipTotal = round ? module.exports.round(StatData.ratingStats.pipTotal) : StatData.ratingStats.pipTotal;

        let description = `Your Stats:\n${Data.emojis.str}: **${str}**/255 ${Data.space(2)}${Data.emojis.int}: **${int}**/250 ${Data.space(2)}${Data.emojis.agil}: **${agil}**/260 ${Data.space(2)}${Data.emojis.will}: **${will}**/260 ${Data.space(2)}${Data.emojis.power}: **${power}**/250`
                            + `\n\n*${Data.emojis.myth}**:** school based talent*`;
        
        if (round)
            description += `${Data.space(1)}*${Data.emojis.fake}**:** fake stat* ${Data.space(1)} ${Data.emojis.round}${Data.space(1)} **Rounding Enabled!**\n`;

        const embed = new Discord.MessageEmbed()
            .setColor("#8648F7")
            .setTitle(`${Data.emojis.crit} **━━━━━━━ RATING PET STATS ━━━━━━━** ${Data.emojis.crit}`)
            .setDescription(description)
            .addField(`${Data.emojis.crit} ━━ CRITICAL ━━ ${Data.emojis.crit}`, 
                        `*boosted by: ${Data.emojis.agil} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**${Data.emojis.myth} Assailant:** +${assailant} ${Data.emojis.myth}${Data.emojis.crit}`
                        + `\n**${Data.emojis.myth} Striker:** ${Data.space(7)} +${sStriker} ${Data.emojis.myth}${Data.emojis.crit}`
                        + `\n**Critical Striker:**  ${Data.space(1)} +${cStriker} ${Data.emojis.crit}`
                        + `\n**Critical Hitter:** ${Data.space(3)} +${hitter} ${Data.emojis.crit}`
                        + `\nTotals:`
                        + `\n+${allCritTotal} **|** +${schoolCritTotal} **|** +${universalCritTotal} ${Data.emojis.crit}`, true)
            .addField(`${Data.emojis.block} ━━ BLOCK ━━ ${Data.emojis.block}`, 
                        `*boosted by: ${Data.emojis.int} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**Defender:** ${Data.space(1)} +${defender} ${Data.emojis.block}`
                        + `\n**Blocker:** ${Data.space(5)} +${blocker} ${Data.emojis.block}`
                        + `\nTotal: +${blockTotal} ${Data.emojis.block}`, true)
            .addField("\u200b", "\u200b")
            .addField(`${Data.emojis.pcon} ━ PIP CONVERT ━ ${Data.emojis.pcon}`, 
                        `*boosted by: ${Data.emojis.agil} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**Pip Conserver:** +${conserver} ${Data.emojis.pcon}`
                        + `\n**Pip Saver:** ${Data.space(10)} +${saver} ${Data.emojis.pcon}`
                        + `\nTotal: +${pconTotal} ${Data.emojis.pcon}`, true)
            .addField(`${Data.emojis.pip} ━━━ PIPS ━━━ ${Data.emojis.pip}`, 
                        `*boosted by: ${Data.emojis.str} & ${Data.space(1)}${Data.emojis.int}*`
                        + `\n**Pip 'O Plenty:** ${Data.space(1)} ${oplenty}% ${Data.emojis.pip}`
                        + `\n**Pip Boost:** 5% ${Data.emojis.pip}`
                        + `\nTotal: ${pipTotal}% ${Data.emojis.pip}`, true)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**Invite Kiwi!**](${Data.inviteLink}) ${Data.emojis.kiwi}`)
            .setFooter(Data.footer.footer, Data.footer.image);

        return embed;
    },
    healing(str, int, agil, will, power, round) {
        // incoming, outgoing, health

        if (!StatData.healthStats.generated)
            StatData.generateHealth(str, int, agil, will, power);

        // incoming
        lively = round ? module.exports.round(StatData.healthStats.lively) : StatData.healthStats.lively;
        healthy = round ? module.exports.round(StatData.healthStats.healthy) : StatData.healthStats.healthy;
        incTotal = round ? module.exports.round(StatData.healthStats.incTotal) : StatData.healthStats.incTotal;
        
        // outgoing
        medic = round ? module.exports.round(StatData.healthStats.medic) : StatData.healthStats.medic;
        healer = round ? module.exports.round(StatData.healthStats.healer) : StatData.healthStats.healer;
        outTotal = round ? module.exports.round(StatData.healthStats.outTotal) : StatData.healthStats.outTotal;
        
        // health
        bounty = round ? module.exports.round(StatData.healthStats.bounty) : StatData.healthStats.bounty;
        gift = round ? module.exports.round(StatData.healthStats.gift) : StatData.healthStats.gift;
        boost = round ? module.exports.round(StatData.healthStats.boost) : StatData.healthStats.boost;
        add = round ? module.exports.round(StatData.healthStats.add) : StatData.healthStats.add;
        healthTotal = round ? module.exports.round(StatData.healthStats.healthTotal) : StatData.healthStats.healthTotal;

        let description = `Your Stats:\n${Data.emojis.str}: **${str}**/255 ${Data.space(2)}${Data.emojis.int}: **${int}**/250 ${Data.space(2)}${Data.emojis.agil}: **${agil}**/260 ${Data.space(2)}${Data.emojis.will}: **${will}**/260 ${Data.space(2)}${Data.emojis.power}: **${power}**/250\n${Data.emptyChar}`;
        
        if (round)
            description += `\n${Data.space(1)}*${Data.emojis.fake}**:** fake stat* ${Data.space(1)} ${Data.emojis.round}${Data.space(1)} **Rounding Enabled!**\n`;

        const embed = new Discord.MessageEmbed()
            .setColor("#D41112")
            .setTitle(`${Data.emojis.heart} **━━━━━━━ HEALTH PET STATS ━━━━━━━** ${Data.emojis.heart}`)
            .setDescription(description)
            .addField(`${Data.emojis.inc} ━━ INCOMING ━━ ${Data.emojis.inc}`, 
                        `*boosted by: ${Data.emojis.str} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**Lively:** ${Data.space(6)} ${lively}% ${Data.emojis.inc}${Data.emojis.heart}`
                        + `\n**Healthy:** ${Data.space(1)} ${healthy}% ${Data.emojis.inc}${Data.emojis.heart}`
                        + `\nTotal: ${incTotal}% ${Data.emojis.inc}${Data.emojis.heart}`, true)
            .addField(`${Data.emojis.out} ━━ OUTGOING ━━ ${Data.emojis.out}`, 
                        `*boosted by: ${Data.emojis.str} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**Medic:** ${Data.space(3)} ${medic}% ${Data.emojis.out}${Data.emojis.heart}`
                        + `\n**Healer:** ${Data.space(1)} ${healer}% ${Data.emojis.out}${Data.emojis.heart}`
                        + `\nTotal: ${outTotal}% ${Data.emojis.out}${Data.emojis.heart}`, true)
            .addField("\u200b", "\u200b")
            .addField(`${Data.emojis.health} ━━ HEALTH ━━ ${Data.emojis.health}`, 
                        `*boosted by: ${Data.emojis.agil} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**Health Bounty:** +${bounty} ${Data.emojis.health}`
                        + `\n**Health Gift:** ${Data.space(11)} +${gift} ${Data.emojis.health}`
                        + `\n**Health Boost:** ${Data.space(2)} +${boost} ${Data.emojis.health}`
                        + `\n**Health Add:** ${Data.space(8)} +${add} ${Data.emojis.health}`
                        + `\nTotal: +${healthTotal} ${Data.emojis.health}`, true)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**Invite Kiwi!**](${Data.inviteLink}) ${Data.emojis.kiwi}`)
            .setFooter(Data.footer.footer, Data.footer.image);

        return embed;
    },
    misc(str, int, agil, will, power, round) {
        // stun resist, fish luck, mana

        if (!StatData.miscStats.generated)
            StatData.generateMisc(str, int, agil, will, power);

        // stun resist
        recalcitrant = round ? module.exports.round(StatData.miscStats.recalcitrant) : StatData.miscStats.recalcitrant;
        resistant = round ? module.exports.round(StatData.miscStats.resistant) : StatData.miscStats.resistant;
        stunTotal = round ? module.exports.round(StatData.miscStats.stunTotal) : StatData.miscStats.stunTotal;
        
        // fish luck
        epicluck = round ? module.exports.round(StatData.miscStats.epicluck) : StatData.miscStats.epicluck;
        luck = round ? module.exports.round(StatData.miscStats.luck) : StatData.miscStats.luck;
        luckTotal = round ? module.exports.round(StatData.miscStats.luckTotal) : StatData.miscStats.luckTotal;
        
        // mana
        bounty = round ? module.exports.round(StatData.miscStats.bounty) : StatData.miscStats.bounty;
        gift = round ? module.exports.round(StatData.miscStats.gift) : StatData.miscStats.gift;
        boost = round ? module.exports.round(StatData.miscStats.boost) : StatData.miscStats.boost;
        extra = round ? module.exports.round(StatData.miscStats.extra) : StatData.miscStats.extra;
        manaTotal = round ? module.exports.round(StatData.miscStats.manaTotal) : StatData.miscStats.manaTotal;

        let description = `Your Stats:\n${Data.emojis.str}: **${str}**/255 ${Data.space(2)}${Data.emojis.int}: **${int}**/250 ${Data.space(2)}${Data.emojis.agil}: **${agil}**/260 ${Data.space(2)}${Data.emojis.will}: **${will}**/260 ${Data.space(2)}${Data.emojis.power}: **${power}**/250\n${Data.emptyChar}`;
        
        if (round)
            description += `\n${Data.space(1)}*${Data.emojis.fake}**:** fake stat* ${Data.space(1)} ${Data.emojis.round}${Data.space(1)} **Rounding Enabled!**\n`;

        const embed = new Discord.MessageEmbed()
            .setColor("#E8932F")
            .setTitle(`${Data.emojis.luck} **━━━━━━━ MISC PET STATS ━━━━━━━** ${Data.emojis.luck}`)
            .setDescription(description)
            .addField(`${Data.emojis.stunres} ━━ STUN RESIST ━━ ${Data.emojis.stunres}`, 
                        `*boosted by: ${Data.emojis.str} & ${Data.space(1)}${Data.emojis.int}*`
                        + `\n**Stun Recalcitrant:** ${recalcitrant}% ${Data.emojis.stunres}`
                        + `\n**Stun Resistant:** ${Data.space(5)} ${resistant}% ${Data.emojis.stunres}`
                        + `\nTotal: ${stunTotal}% ${Data.emojis.stunres}`, true)
            .addField(`${Data.emojis.luck} ━━ FISH LUCK ━━ ${Data.emojis.luck}`, 
                        `*boosted by: ${Data.emojis.int} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**Epic Fish Luck:** ${epicluck}% ${Data.emojis.luck}`
                        + `\n**Fish Luck:** ${Data.space(10)} ${luck}% ${Data.emojis.luck}`
                        + `\nTotal: ${luckTotal}% ${Data.emojis.luck}`, true)
            .addField("\u200b", "\u200b")
            .addField(`${Data.emojis.mana} ━━━ MANA ━━━ ${Data.emojis.mana}`, 
                        `*boosted by: ${Data.emojis.int} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**Mana Bounty:** ${Data.space(1)} +${bounty} ${Data.emojis.mana}`
                        + `\n**Mana Gift:** ${Data.space(6)} +${gift} ${Data.emojis.mana}`
                        + `\n**Mana Boost:** ${Data.space(3)} +${boost} ${Data.emojis.mana}`
                        + `\n**Extra Mana:** ${Data.space(4)} +${extra} ${Data.emojis.mana}`
                        + `\nTotal: +${manaTotal} ${Data.emojis.mana}`, true)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**Invite Kiwi!**](${Data.inviteLink}) ${Data.emojis.kiwi}`)
            .setFooter(Data.footer.footer, Data.footer.image);

        return embed;
    },
    fake(val) {
        let decimals =  (val % 1).toFixed(4);

        // fake range is 0.5 - 0.549
        if (0.49 < decimals && decimals < 0.55)
            return true;
        else
            return false;
    },
    round(val) {
        // if val < 1
        if (val < 1)
            return 1;
    
        // otherwise, if the value is fake
        if (module.exports.fake(val))
            return `${Data.emojis.fake} ${Math.round(val)}`;
        else
            return Math.round(val);
    }
}