// require discord.js module
const Discord = require("discord.js");
// require talent database
const Talents = require("../utilities/talents.js");
// require emojis.js module
const Emojis = require("../utilities/emojis.js");
// require format.js module
const Format = require("../utilities/format.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "pool",
    description: "read a pet's talent pool",
    execute(bot, msg, args) {
        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));

        pet = [
            {
                "order": -1,
                "rank": 2,
                "lower": -1,
                "upper": -1
            },
            {
                "order": -1,
                "rank": 3,
                "lower": -1,
                "upper": -1
            },
            {
                "order": -1,
                "rank": 4,
                "lower": -1,
                "upper": -1
            },
            {
                "order": -1,
                "rank": 2,
                "lower": -1,
                "upper": -1
            },
            {
                "order": -1,
                "rank": 1,
                "lower": -1,
                "upper": -1
            },
            {
                "order": -1,
                "rank": 3,
                "lower": -1,
                "upper": -1
            },
            {
                "order": -1,
                "rank": 4,
                "lower": -1,
                "upper": -1
            },
            {
                "order": -1,
                "rank": 3,
                "lower": -1,
                "upper": -1
            },
            {
                "order": -1,
                "rank": 3,
                "lower": -1,
                "upper": -1
            },
            {
                "order": -1,
                "rank": 1,
                "lower": -1,
                "upper": -1
            }
        ];

        generateRanges(pet);

        // log command use
        //Mongo.logCMD(bot, msg, msg.guild.id, "pool");
    }
}

function generateRanges(pet) {
    // input is an array of size 10, where each element is a talent object
    // talent = {
    //     order: X, // -1 = unknown
    //     rank: X,
    //     upper: -1,
    //     lower: -1
    // }

    // lower bound generation
    for (let i = 0; i < pet.length; i++) {
        let talent = pet[i];
        
        // if order already known, update upper and lower
        if (talent.order != -1) {
            talent.upper = talent.upper;
            talent.lower = talent.lower;

        // if first talent and order not known
        } else if (i === 0) {
            // get first occurence of rank in DB
            let order = Talents.find(ele => ele.rank === talent.rank).order;
            // set lower bound
            talent.lower = order;

        } else {
            let bound = pet[i - 1].lower;

            // set lower to earlier occurence of talent rank after previous talent
            let order = Talents.find(ele => ele.rank === talent.rank && ele.order > bound).order;
            // set lower bound
            talent.lower = order;
        }
    }

    // upper bound generation
    for (let i = pet.length - 1; i >= 0; i--) {
        let talent = pet[i];
        
        // if last talent
        if (i === pet.length - 1) {
            // get first occurence of rank in DB
            let filtered = Talents.filter(ele => ele.rank === talent.rank);
            let order = filtered[filtered.length - 1].order;
            // set upper bound
            talent.upper = order;

        } else {
            let bound = pet[i + 1].upper;

            // set upper to last occurence of talent rank before previous talent
            let filtered = Talents.filter(ele => ele.rank === talent.rank && ele.order < bound);
            let order = filtered[filtered.length - 1].order;
            // set upper bound
            talent.upper = order;
        }
    }

    // count options for each slot
    for (let i  = 0; i < pet.length; i++) {
        let talent = pet[i];

        let filtered = Talents.filter(ele => ele.rank === talent.rank && ele.order >= talent.lower && ele.order <= talent.upper);
        let count = filtered.length -1;
        talent.count = count;
    }

    console.log(pet);
}