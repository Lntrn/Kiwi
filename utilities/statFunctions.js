// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("./data.js");

module.exports = {
    base(str, int, agil, will, power, round) {
        // damage, resist, accuracy, pierce
        const baseStats = module.exports.generateBase(str, int, agil, will, power);

        // damage
        dealer = round ? module.exports.round(baseStats.dealer) : baseStats.dealer;
        giver = round ? module.exports.round(baseStats.giver) : baseStats.giver;
        boon = round ? module.exports.round(baseStats.boon) : baseStats.boon;
        alldmgTotal = round ? module.exports.round(baseStats.alldmgTotal) : baseStats.alldmgTotal;
        schoolDmgTotal = round ? module.exports.round(baseStats.schoolDmgTotal) : baseStats.schoolDmgTotal;
        universalDmgTotal = round ? module.exports.round(baseStats.universalDmgTotal) : baseStats.universalDmgTotal;

        // resist
        ward = round ? module.exports.round(baseStats.ward) : baseStats.ward;
        proof = round ? module.exports.round(baseStats.proof) : baseStats.proof;
        defy = round ? module.exports.round(baseStats.defy) : baseStats.defy;
        wardTotal = round ? module.exports.round(baseStats.wardTotal) : baseStats.wardTotal;
        proofDefyTotal = round ? module.exports.round(baseStats.proofDefyTotal) : baseStats.proofDefyTotal;

        // accuracy
        sniper = round ? module.exports.round(baseStats.sniper) : baseStats.sniper;
        shot = round ? module.exports.round(baseStats.shot) : baseStats.shot;
        eye = round ? module.exports.round(baseStats.eye) : baseStats.eye;
        schoolAccTotal = round ? module.exports.round(baseStats.schoolAccTotal) : baseStats.schoolAccTotal;
        universalAccTotal = round ? module.exports.round(baseStats.universalAccTotal) : baseStats.universalAccTotal;

        // pierce
        breaker = round ? module.exports.round(baseStats.breaker) : baseStats.breaker;
        piercer = round ? module.exports.round(baseStats.piercer) : baseStats.piercer;
        pierceTotal = round ? module.exports.round(baseStats.pierceTotal) : baseStats.pierceTotal;
        
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
            .setFooter(Data.footer.text, Data.footer.image);

        return embed;
    },
    rating(str, int, agil, will, power, round) {
        // critical, block, pip convert, pips
        const ratingStats = module.exports.generateRating(str, int, agil, will, power);

        // critical
        assailant = round ? module.exports.round(ratingStats.assailant) : ratingStats.assailant;
        sStriker = round ? module.exports.round(ratingStats.sStriker) : ratingStats.sStriker;
        cStriker = round ? module.exports.round(ratingStats.cStriker) : ratingStats.cStriker;
        hitter = round ? module.exports.round(ratingStats.hitter) : ratingStats.hitter;
        allCritTotal = round ? module.exports.round(ratingStats.allCritTotal) : ratingStats.allCritTotal;
        schoolCritTotal = round ? module.exports.round(ratingStats.schoolCritTotal) : ratingStats.schoolCritTotal;
        universalCritTotal = round ? module.exports.round(ratingStats.universalCritTotal) : ratingStats.universalCritTotal;
        
        // block
        defender = round ? module.exports.round(ratingStats.defender) : ratingStats.defender;
        blocker = round ? module.exports.round(ratingStats.blocker) : ratingStats.blocker;
        blockTotal = round ? module.exports.round(ratingStats.blockTotal) : ratingStats.blockTotal;
        
        // pip convert
        conserver = round ? module.exports.round(ratingStats.conserver) : ratingStats.conserver;
        saver = round ? module.exports.round(ratingStats.saver) : ratingStats.saver;
        pconTotal = round ? module.exports.round(ratingStats.pconTotal) : ratingStats.pconTotal;
        
        // pips
        oplenty = round ? module.exports.round(ratingStats.oplenty) : ratingStats.oplenty;
        pipTotal = round ? module.exports.round(ratingStats.pipTotal) : ratingStats.pipTotal;

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
            .setFooter(Data.footer.text, Data.footer.image);

        return embed;
    },
    healing(str, int, agil, will, power, round) {
        // incoming, outgoing, health
        const healthStats = module.exports.generateHealth(str, int, agil, will, power);

        // incoming
        lively = round ? module.exports.round(healthStats.lively) : healthStats.lively;
        healthy = round ? module.exports.round(healthStats.healthy) : healthStats.healthy;
        incTotal = round ? module.exports.round(healthStats.incTotal) : healthStats.incTotal;
        
        // outgoing
        medic = round ? module.exports.round(healthStats.medic) : healthStats.medic;
        healer = round ? module.exports.round(healthStats.healer) : healthStats.healer;
        outTotal = round ? module.exports.round(healthStats.outTotal) : healthStats.outTotal;
        
        // health
        bounty = round ? module.exports.round(healthStats.bounty) : healthStats.bounty;
        gift = round ? module.exports.round(healthStats.gift) : healthStats.gift;
        boost = round ? module.exports.round(healthStats.boost) : healthStats.boost;
        add = round ? module.exports.round(healthStats.add) : healthStats.add;
        healthTotal = round ? module.exports.round(healthStats.healthTotal) : healthStats.healthTotal;

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
            .setFooter(Data.footer.text, Data.footer.image);

        return embed;
    },
    misc(str, int, agil, will, power, round) {
        // stun resist, fish luck, mana
        const miscStats = module.exports.generateMisc(str, int, agil, will, power);

        // stun resist
        recalcitrant = round ? module.exports.round(miscStats.recalcitrant) : miscStats.recalcitrant;
        resistant = round ? module.exports.round(miscStats.resistant) : miscStats.resistant;
        stunTotal = round ? module.exports.round(miscStats.stunTotal) : miscStats.stunTotal;
        
        // fish luck
        epicluck = round ? module.exports.round(miscStats.epicluck) : miscStats.epicluck;
        luck = round ? module.exports.round(miscStats.luck) : miscStats.luck;
        luckTotal = round ? module.exports.round(miscStats.luckTotal) : miscStats.luckTotal;
        
        // mana
        bounty = round ? module.exports.round(miscStats.bounty) : miscStats.bounty;
        gift = round ? module.exports.round(miscStats.gift) : miscStats.gift;
        boost = round ? module.exports.round(miscStats.boost) : miscStats.boost;
        extra = round ? module.exports.round(miscStats.extra) : miscStats.extra;
        manaTotal = round ? module.exports.round(miscStats.manaTotal) : miscStats.manaTotal;

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
            .setFooter(Data.footer.text, Data.footer.image);

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
            return `${Data.emojis.fake}${Math.round(val)}`;
        else
            return Math.round(val);
    },
    generateBase(str, int, agil, will, power) {
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
    },
    generateRating(str, int, agil, will, power) {
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
    },
    generateHealth(str, int, agil, will, power) {
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
    },
    generateMisc(str, int, agil, will, power) {
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
}