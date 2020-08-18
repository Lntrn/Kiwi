// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("./data.js");

module.exports = {
    base(str, int, agil, will, power) {
        // damage, resist, accuracy, pierce

        // damage 10% 6% 3% | 6% 3%
        const dealer = (((2 * str) + (2 * will) + power) * 3) / 400;
        const giver = ((2 * str) + (2 * will) + power) / 200;
        const boon = ((2 * str) + (2 * will) + power) / 400;

        // resist 15% 10% 5% | 10% 5%
        const ward = (((2 * str) + (2 * agil) + power) * 3) / 250;
        const proof = ((2 * str) + (2 * agil) + power) / 125;
        const defy = ((2 * str) + (2 * agil) + power) / 250;

        // accuracy 13% 9% 4% | 9% 4%
        const sniper = (((2 * int) + (2 * agil) + power) * 3) / 400;
        const shot = ((2 * int) + (2 * agil) + power) / 200;
        const eye = ((2 * int) + (2 * agil) + power) / 400;

        // pierce 3% 2%
        const breaker = ((2 * str) + (2 * agil) + power) / 400;
        const piercer = (((2 * str) + (2 * agil) + power) * 3) / 2000;

        const embed = new Discord.MessageEmbed()
            .setColor("#ECC088")
            .setTitle(`${Data.emojis.dmg} **━━━━━━━━ BASE PET STATS ━━━━━━━━** ${Data.emojis.dmg}`)
            .setDescription(`Your Stats:
                            ${Data.emojis.str}: **${str}**/255 ${Data.space(2)}${Data.emojis.int}: **${int}**/250 ${Data.space(2)}${Data.emojis.agil}: **${agil}**/260 ${Data.space(2)}${Data.emojis.will}: **${will}**/260 ${Data.space(2)}${Data.emojis.power}: **${power}**/250
                            \n*${Data.emojis.ice} represents a school based talent*`)
            .addField(`${Data.emojis.dmg} ━━ DAMAGE ━━ ${Data.emojis.dmg}`, 
                        `*boosted by: ${Data.emojis.str} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**${Data.emojis.ice} Dealer:** ${Data.space(1)} ${dealer}% ${Data.emojis.ice}${Data.emojis.dmg}`
                        + `\n**${Data.emojis.ice} Giver:** ${Data.space(4)} ${giver}% ${Data.emojis.ice}${Data.emojis.dmg}`
                        + `\n**${Data.emojis.ice} Boon:** ${Data.space(5)} ${boon}% ${Data.emojis.ice}${Data.emojis.dmg}`
                        + `\n**Pain-Giver:** ${Data.space(6)} ${giver}% ${Data.emojis.dmg}`
                        + `\n**Pain-Bringer:** ${Data.space(2)} ${boon}% ${Data.emojis.dmg}`, true)
            .addField(`${Data.emojis.res} ━━━ RESIST ━━━ ${Data.emojis.res}`, 
                        `*boosted by: ${Data.emojis.str} & ${Data.space(1)}${Data.emojis.agil}*`
                        + `\n**${Data.emojis.ice} Ward:** ${Data.space(2)} ${ward}% ${Data.emojis.ice}${Data.emojis.res}`
                        + `\n**${Data.emojis.ice} Proof:** ${Data.space(2)} ${proof}% ${Data.emojis.ice}${Data.emojis.res}`
                        + `\n**${Data.emojis.ice} Away:** ${Data.space(5)} ${defy}% ${Data.emojis.ice}${Data.emojis.res}`
                        + `\n**Spell-Proof:** ${Data.space(3)} ${proof}% ${Data.emojis.res}`
                        + `\n**Spell-Defying:** ${Data.space(1)} ${defy}% ${Data.emojis.res}`, true)
            .addField("\u200b", "\u200b")
            .addField(`${Data.emojis.acc} ━━ ACCURACY ━━ ${Data.emojis.acc}`, 
                        `*boosted by: ${Data.emojis.int} & ${Data.space(1)}${Data.emojis.agil}*`
                        + `\n**${Data.emojis.ice} Sniper:** ${sniper}% ${Data.emojis.ice}${Data.emojis.acc}`
                        + `\n**${Data.emojis.ice} Shot:** ${Data.space(6)} ${shot}% ${Data.emojis.ice}${Data.emojis.acc}`
                        + `\n**${Data.emojis.ice} Eye:** ${Data.space(6)} ${eye}% ${Data.emojis.ice}${Data.emojis.acc}`
                        + `\n**Sharp-Shot:** ${Data.space(5)} ${shot}% ${Data.emojis.acc}`
                        + `\n**Sharp-Eye:** ${Data.space(6)} ${eye}% ${Data.emojis.acc}`, true)
            .addField(`${Data.emojis.pierce} ━━ PIERCE ━━ ${Data.emojis.pierce}`, 
                        `*boosted by: ${Data.emojis.str} & ${Data.space(1)}${Data.emojis.agil}*`
                        + `\n**Armor Breaker:** ${Data.space(2)} ${breaker}% ${Data.emojis.pierce}`
                        + `\n**Armor Piercer:** ${Data.space(1)} ${piercer}% ${Data.emojis.pierce}`, true)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**Invite Kiwi!**](${Data.inviteLink}) ${Data.emojis.kiwi}`)
            .setFooter(Data.footer.footer, Data.footer.image);

        return embed;
    },
    rating(str, int, agil, will, power) {
        // critical, block, pips, pip convert

        // critical 32 26 | 31 23
        const assailant = ((2 * agil) + (2 * will) + power) / 40;
        const sStriker = ((2 * agil) + (2 * will) + power) * 3 / 150;
        const cStriker = ((2 * agil) + (2 * will) + power) * 3 / 125;
        const hitter = ((2 * agil) + (2 * will) + power) * 9 / 500;

        // block 30 25
        const defender = ((2 * int) + (2 * will) + power) * 3 / 125;
        const blocker = ((2 * int) + (2 * will) + power) * 9 / 500;

        // pip conversion 30 25
        const conserver = ((2 * agil) + (2 * will) + power) * 3 / 125;
        const saver = ((2 * agil) + (2 * will) + power) * 9 / 500;

        // pip chance 5%
        const oplenty = ((2 * str) + (2 * int) + power) / 250;

        const embed = new Discord.MessageEmbed()
            .setColor("#8648F7")
            .setTitle(`${Data.emojis.crit} **━━━━━━━ RATING PET STATS ━━━━━━━** ${Data.emojis.crit}`)
            .setDescription(`Your Stats:
                            ${Data.emojis.str}: **${str}**/255 ${Data.space(2)}${Data.emojis.int}: **${int}**/250 ${Data.space(2)}${Data.emojis.agil}: **${agil}**/260 ${Data.space(2)}${Data.emojis.will}: **${will}**/260 ${Data.space(2)}${Data.emojis.power}: **${power}**/250
                            \n*${Data.emojis.myth} represents a school based talent*`)
            .addField(`${Data.emojis.crit} ━━ CRITICAL ━━ ${Data.emojis.crit}`, 
                        `*boosted by: ${Data.emojis.agil} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**${Data.emojis.myth} Assailant:** +${assailant} ${Data.emojis.myth}${Data.emojis.crit}`
                        + `\n**${Data.emojis.myth} Striker:** ${Data.space(7)} +${sStriker} ${Data.emojis.myth}${Data.emojis.crit}`
                        + `\n**Critical Striker:**  ${Data.space(1)} +${cStriker} ${Data.emojis.crit}`
                        + `\n**Critical Hitter:** ${Data.space(3)} +${hitter} ${Data.emojis.crit}`, true)
            .addField(`${Data.emojis.block} ━━ BLOCK ━━ ${Data.emojis.block}`, 
                        `*boosted by: ${Data.emojis.int} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**Defender:** ${Data.space(1)} +${defender} ${Data.emojis.block}`
                        + `\n**Blocker:** ${Data.space(5)} +${blocker} ${Data.emojis.block}`, true)
            .addField("\u200b", "\u200b")
            .addField(`${Data.emojis.pcon} ━ PIP CONVERT ━ ${Data.emojis.pcon}`, 
                        `*boosted by: ${Data.emojis.agil} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**Pip Conserver:** +${conserver} ${Data.emojis.pcon}`
                        + `\n**Pip Saver:** ${Data.space(10)} +${saver} ${Data.emojis.pcon}`, true)
            .addField(`${Data.emojis.pip} ━━━ PIPS ━━━ ${Data.emojis.pip}`, 
                        `*boosted by: ${Data.emojis.str} & ${Data.space(1)}${Data.emojis.int}*`
                        + `\n**Pip 'O Plenty:** ${Data.space(1)} ${oplenty}% ${Data.emojis.pip}`, true)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**Invite Kiwi!**](${Data.inviteLink}) ${Data.emojis.kiwi}`)
            .setFooter(Data.footer.footer, Data.footer.image);

        return embed;
    },
    healing(str, int, agil, will, power) {
        // incoming, outgoing, health

        // incoming 8% 4%
        const lively  = ((2 * str) + (2 * will) + power) * 13 / 2000;
        const healthy = ((2 * str) + (2 * will) + power) * 3 / 1000;

        // outgoing 8% 4%
        const medic = ((2 * str) + (2 * will) + power) * 13 / 2000;
        const healer = ((2 * str) + (2 * will) + power) * 3 / 1000;

        // health 150 125 100 75
        const bounty = ((2 * agil) + (2 * will) + power) * 3 / 25;
        const gift = ((2 * agil) + (2 * will) + power) / 10;
        const boost = ((2 * agil) + (2 * will) + power) * 6 / 75;
        const add = ((2 * agil) + (2 * will) + power) * 3 / 50;

        const embed = new Discord.MessageEmbed()
            .setColor("#D41112")
            .setTitle(`${Data.emojis.heart} **━━━━━━━ HEALTH PET STATS ━━━━━━━** ${Data.emojis.heart}`)
            .setDescription(`Your Stats:\n${Data.emojis.str}: **${str}**/255 ${Data.space(2)}${Data.emojis.int}: **${int}**/250 ${Data.space(2)}${Data.emojis.agil}: **${agil}**/260 ${Data.space(2)}${Data.emojis.will}: **${will}**/260 ${Data.space(2)}${Data.emojis.power}: **${power}**/250`)
            .addField(`${Data.emojis.inc} ━━ INCOMING ━━ ${Data.emojis.inc}`, 
                        `*boosted by: ${Data.emojis.str} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**Lively:** ${Data.space(6)} ${lively}% ${Data.emojis.inc}${Data.emojis.heart}`
                        + `\n**Healthy:** ${Data.space(1)} ${healthy}% ${Data.emojis.inc}${Data.emojis.heart}`, true)
            .addField(`${Data.emojis.out} ━━ OUTGOING ━━ ${Data.emojis.out}`, 
                        `*boosted by: ${Data.emojis.str} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**Medic:** ${Data.space(3)} ${medic}% ${Data.emojis.out}${Data.emojis.heart}`
                        + `\n**Healer:** ${Data.space(1)} ${healer}% ${Data.emojis.out}${Data.emojis.heart}`, true)
            .addField("\u200b", "\u200b")
            .addField(`${Data.emojis.health} ━━ HEALTH ━━ ${Data.emojis.health}`, 
                        `*boosted by: ${Data.emojis.agil} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**Health Bounty:** +${bounty} ${Data.emojis.health}`
                        + `\n**Health Gift:** ${Data.space(11)} +${gift} ${Data.emojis.health}`
                        + `\n**Health Boost:** ${Data.space(2)} +${boost} ${Data.emojis.health}`
                        + `\n**Health Add:** ${Data.space(8)} +${add} ${Data.emojis.health}`, true)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**Invite Kiwi!**](${Data.inviteLink}) ${Data.emojis.kiwi}`)
            .setFooter(Data.footer.footer, Data.footer.image);

        return embed;
    },
    misc(str, int, agil, will, power) {
        // mana, fishluck, stun resist

        // stun 10 7
        const recalcitrant = ((2 * str) + (2 * int) + power) / 125;
        const resistant = ((2 * str) + (2 * int) + power) / 250;

        // fish luck 3% 3%
        const epicluck = ((2 * int) + (2 * will) + power) / 400;
        const luck = ((2 * int) + (2 * will) + power) / 400;

        // mana 125 100 75 50
        const bounty = ((2 * int) + (2 * will) + power) / 10;
        const gift = ((2 * int) + (2 * will) + power) * 6 / 75;
        const boost = ((2 * int) + (2 * will) + power) * 3 / 50;
        const extra = ((2 * int) + (2 * will) + power) / 25;

        const embed = new Discord.MessageEmbed()
            .setColor("#E8932F")
            .setTitle(`${Data.emojis.luck} **━━━━━━━ MISC PET STATS ━━━━━━━** ${Data.emojis.luck}`)
            .setDescription(`Your Stats:
                            ${Data.emojis.str}: **${str}**/255 ${Data.space(2)}${Data.emojis.int}: **${int}**/250 ${Data.space(2)}${Data.emojis.agil}: **${agil}**/260 ${Data.space(2)}${Data.emojis.will}: **${will}**/260 ${Data.space(2)}${Data.emojis.power}: **${power}**/250`)
            .addField(`${Data.emojis.stunres} ━━ STUN RESIST ━━ ${Data.emojis.stunres}`, 
                        `*boosted by: ${Data.emojis.str} & ${Data.space(1)}${Data.emojis.int}*`
                        + `\n**Stun Recalcitrant:** ${recalcitrant}% ${Data.emojis.stunres}`
                        + `\n**Stun Resistant:** ${Data.space(5)} ${resistant}% ${Data.emojis.stunres}`, true)
            .addField(`${Data.emojis.luck} ━━ FISH LUCK ━━ ${Data.emojis.luck}`, 
                        `*boosted by: ${Data.emojis.int} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**Epic Fish Luck:** ${epicluck}% ${Data.emojis.luck}`
                        + `\n**Fish Luck:** ${Data.space(10)} ${luck}% ${Data.emojis.luck}`, true)
            .addField("\u200b", "\u200b")
            .addField(`${Data.emojis.mana} ━━ MANA ━━ ${Data.emojis.mana}`, 
                        `*boosted by: ${Data.emojis.int} & ${Data.space(1)}${Data.emojis.will}*`
                        + `\n**Mana Bounty:** ${Data.space(1)} +${bounty} ${Data.emojis.mana}`
                        + `\n**Mana Gift:** ${Data.space(6)} +${gift} ${Data.emojis.mana}`
                        + `\n**Mana Boost:** ${Data.space(3)} +${boost} ${Data.emojis.mana}`
                        + `\n**Extra Mana:** ${Data.space(4)} +${extra} ${Data.emojis.mana}`, true)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**Invite Kiwi!**](${Data.inviteLink}) ${Data.emojis.kiwi}`)
            .setFooter(Data.footer.footer, Data.footer.image);

        return embed;
    }
}