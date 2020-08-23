// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("./data.js");

module.exports = {
    baseStats: {
        generated: false,
        dealer: 0,
        giver: 0,
        boon: 0,
        alldmgTotal: 0,
        schoolDmgTotal: 0,
        universalDmgTotal: 0,
        ward: 0,
        proof: 0,
        defy: 0,
        wardTotal: 0,
        proofDefyTotal: 0,
        sniper: 0,
        shot: 0,
        eye: 0,
        schoolAccTotal: 0,
        universalAccTotal: 0,
        breaker: 0,
        piercer: 0,
        pierceTotal: 0
    },
    ratingStats: {
        generated: false,
        assailant: 0,
        sStriker: 0,
        cStriker: 0,
        hitter: 0,
        allCritTotal: 0,
        schoolCritTotal: 0,
        universalCritTotal: 0,
        defender: 0,
        blocker: 0,
        blockTotal: 0,
        conserver: 0,
        saver: 0,
        pconTotal: 0,
        oplenty: 0,
        pipTotal: 0
    },
    healthStats: {
        generated: false,
        lively: 0,
        healthy: 0,
        incTotal: 0,
        medic: 0,
        healer: 0,
        outTotal: 0,
        bounty: 0,
        gift: 0,
        boost: 0,
        add: 0,
        healthTotal: 0
    },
    miscStats: {
        generated: false,
        recalcitrant: 0,
        resistant: 0,
        stunTotal: 0,
        epicluck: 0,
        luck: 0,
        luckTotal: 0,
        bounty: 0,
        gift: 0,
        boost: 0,
        extra: 0,
        manaTotal: 0
    },
    generateBase(str, int, agil, will, power) {
        // damage 10% 6% 3% | 6% 3%
        let dealer, giver, boon;
        module.exports.baseStats.dealer = dealer = (((2 * str) + (2 * will) + power) * 3) / 400;
        module.exports.baseStats.giver = giver = ((2 * str) + (2 * will) + power) / 200;
        module.exports.baseStats.boon = boon = ((2 * str) + (2 * will) + power) / 400;
        module.exports.baseStats.alldmgTotal = Math.round((dealer + giver + boon + giver + boon + Number.EPSILON) * 100) / 100;
        module.exports.baseStats.schoolDmgTotal = Math.round((dealer + giver + boon + Number.EPSILON) * 100) / 100;
        module.exports.baseStats.universalDmgTotal = Math.round((giver + boon + Number.EPSILON) * 100) / 100;

        // resist 15% 10% 5% | 10% 5%
        let ward, proof, defy;
        module.exports.baseStats.ward = ward = (((2 * str) + (2 * agil) + power) * 3) / 250;
        module.exports.baseStats.proof = proof = ((2 * str) + (2 * agil) + power) / 125;
        module.exports.baseStats.defy = defy = ((2 * str) + (2 * agil) + power) / 250;
        module.exports.baseStats.wardTotal = Math.round((ward + proof + defy + Number.EPSILON) * 100) / 100;
        module.exports.baseStats.proofDefyTotal = Math.round((proof + defy + Number.EPSILON) * 100) / 100;

        // accuracy 13% 9% 4% | 9% 4%
        let sniper, shot, eye;
        module.exports.baseStats.sniper = sniper = (((2 * int) + (2 * agil) + power) * 3) / 400;
        module.exports.baseStats.shot = shot = ((2 * int) + (2 * agil) + power) / 200;
        module.exports.baseStats.eye = eye = ((2 * int) + (2 * agil) + power) / 400;
        module.exports.baseStats.schoolAccTotal = Math.round((sniper + shot + eye + Number.EPSILON) * 100) / 100;
        module.exports.baseStats.universalAccTotal = Math.round((shot + eye + Number.EPSILON) * 100) / 100;

        // pierce 3% 2%
        let breaker, piercer;
        module.exports.baseStats.breaker = breaker = ((2 * str) + (2 * agil) + power) / 400;
        module.exports.baseStats.piercer = piercer = (((2 * str) + (2 * agil) + power) * 3) / 2000;
        module.exports.baseStats.pierceTotal = Math.round((breaker + piercer + Number.EPSILON) * 100) / 100;

        module.exports.baseStats.generated = true;
    },
    generateRating(str, int, agil, will, power) {
        // critical 32 26 | 31 23
        let assailant, sStriker, cStriker, hitter;
        module.exports.ratingStats.assailant = assailant = ((2 * agil) + (2 * will) + power) / 40;
        module.exports.ratingStats.sStriker = sStriker = ((2 * agil) + (2 * will) + power) * 3 / 150;
        module.exports.ratingStats.cStriker = cStriker = ((2 * agil) + (2 * will) + power) * 3 / 125;
        module.exports.ratingStats.hitter = hitter = ((2 * agil) + (2 * will) + power) * 9 / 500;
        module.exports.ratingStats.allCritTotal = Math.round((assailant + sStriker + cStriker + hitter + Number.EPSILON) * 100) / 100;
        module.exports.ratingStats.schoolCritTotal = Math.round((assailant + sStriker + Number.EPSILON) * 100) / 100;
        module.exports.ratingStats.universalCritTotal = Math.round((cStriker + hitter + Number.EPSILON) * 100) / 100;

        // block 30 25
        let defender, blocker;
        module.exports.ratingStats.defender = defender = ((2 * int) + (2 * will) + power) * 3 / 125;
        module.exports.ratingStats.blocker = blocker = ((2 * int) + (2 * will) + power) * 9 / 500;
        module.exports.ratingStats.blockTotal = Math.round((defender + blocker + Number.EPSILON) * 100) / 100;

        // pip conversion 30 25
        let conserver, saver;
        module.exports.ratingStats.conserver = conserver = ((2 * agil) + (2 * will) + power) * 3 / 125;
        module.exports.ratingStats.saver = saver = ((2 * agil) + (2 * will) + power) * 9 / 500;
        module.exports.ratingStats.pconTotal = Math.round((conserver + saver + Number.EPSILON) * 100) / 100;

        // pip chance 5%
        let oplenty;
        module.exports.ratingStats.oplenty = oplenty = ((2 * str) + (2 * int) + power) / 250;
        module.exports.ratingStats.pipTotal = Math.round((oplenty + 5 + Number.EPSILON) * 100) / 100;

        module.exports.ratingStats.generated = true;
    },
    generateHealth(str, int, agil, will, power) {
        // incoming 8% 4%
        let lively, healthy;
        module.exports.healthStats.lively  = lively = ((2 * str) + (2 * will) + power) * 13 / 2000;
        module.exports.healthStats.healthy = healthy = ((2 * str) + (2 * will) + power) * 3 / 1000;
        module.exports.healthStats.incTotal = Math.round((lively + healthy + Number.EPSILON) * 100) / 100;

        // outgoing 8% 4%
        let medic, healer;
        module.exports.healthStats.medic = medic = ((2 * str) + (2 * will) + power) * 13 / 2000;
        module.exports.healthStats.healer = healer = ((2 * str) + (2 * will) + power) * 3 / 1000;
        module.exports.healthStats.outTotal = Math.round((medic + healer + Number.EPSILON) * 100) / 100;

        // health 150 125 100 75
        let bounty, gift, boost, add;
        module.exports.healthStats.bounty = bounty = ((2 * agil) + (2 * will) + power) * 3 / 25;
        module.exports.healthStats.gift = gift = ((2 * agil) + (2 * will) + power) / 10;
        module.exports.healthStats.boost = boost = ((2 * agil) + (2 * will) + power) * 6 / 75;
        module.exports.healthStats.add = add = ((2 * agil) + (2 * will) + power) * 3 / 50;
        module.exports.healthStats.healthTotal = Math.round((bounty + gift + boost + add + Number.EPSILON) * 100) / 100;

        module.exports.healthStats.generated = true;
    },
    generateMisc(str, int, agil, will, power) {
        // stun 10 7
        let recalcitrant, resistant;
        module.exports.miscStats.recalcitrant = recalcitrant = ((2 * str) + (2 * int) + power) / 125;
        module.exports.miscStats.resistant = resistant = ((2 * str) + (2 * int) + power) / 250;
        module.exports.miscStats.stunTotal = Math.round((recalcitrant + resistant + Number.EPSILON) * 100) / 100;

        // fish luck 3% 3%
        let epicluck, luck;
        module.exports.miscStats.epicluck = epicluck = ((2 * int) + (2 * will) + power) / 400;
        module.exports.miscStats.luck = luck = ((2 * int) + (2 * will) + power) / 400;
        module.exports.miscStats.luckTotal = Math.round((epicluck + luck + Number.EPSILON) * 100) / 100;

        // mana 125 100 75 50
        let bounty, gift, boost, extra;
        module.exports.miscStats.bounty = bounty = ((2 * int) + (2 * will) + power) / 10;
        module.exports.miscStats.gift = gift = ((2 * int) + (2 * will) + power) * 6 / 75;
        module.exports.miscStats.boost = boost = ((2 * int) + (2 * will) + power) * 3 / 50;
        module.exports.miscStats.extra = extra = ((2 * int) + (2 * will) + power) / 25;
        module.exports.miscStats.manaTotal = Math.round((bounty + gift + boost + extra + Number.EPSILON) * 100) / 100;

        module.exports.miscStats.generated = true;
    }
}