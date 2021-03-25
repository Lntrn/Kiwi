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

        // create pet array
        let pet = [];

        for (let i = 0; i < args.length; i++) {
            let talent = {
                "order": -1
            };
            switch (args[i].toLowerCase()) {
                case "c":
                    talent.rank = 0;
                    pet.push(talent);
                    break;
                case "un":
                    talent.rank = 1;
                    pet.push(talent);
                    break;
                case "r":
                    talent.rank = 2;
                    pet.push(talent);
                    break;
                case "ur":
                    talent.rank = 3;
                    pet.push(talent);
                    break;
                case "e":
                    talent.rank = 4;
                    pet.push(talent);
                    break;
                default:
                    talent.order = parseInt(args[i]);
                    talent.rank = Talents.database.find(ele => ele.order === talent.order).rank;
                    pet.push(talent);
            }
        }

        let results = generateRanges(pet);

        // generate printout
        let talents = "";
        let ranges = "";
        let counts = "";
        for (let i = 0; i < results.length; i++) {
            let talent = results[i];
            talents += `\n#${talent.order} [${talent.rank}]`;
            ranges += `\n${talent.lower} - ${talent.upper}`;
            counts += `\n${talent.count}`;
        }

        const read = new Discord.MessageEmbed()
            .setColor("#F7D7C4")
            .setTitle(`📜 **━━━━━━ POOL READ ━━━━━━** 📜`)
            .addField(`TALENT`, talents, true)
            .addField(`RANGE`, ranges, true)
            .addField(`COUNT`, counts, true)
            .addField("\u200b", "\u200b")
            .addField("Like what you see?", `[**${Format.bot.text}**](${Format.bot.invite}) ${Emojis.kiwi.pub}`
                                        + `\n[**${Format.server.text}**](${Format.server.link}) ${Emojis.spiralscholars.pub}`)
            .setFooter(Format.footer.text, Format.footer.image);

        msg.channel.send(read).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "pool", err));

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
            talent.upper = talent.order;
            talent.lower = talent.order;

        // if first talent and order not known
        } else if (i === 0) {
            // get first occurence of rank in DB
            let order = Talents.database.find(ele => ele.rank === talent.rank).order;
            // set lower bound
            talent.lower = order;

        } else {
            let bound = pet[i - 1].lower;

            // set lower to earlier occurence of talent rank after previous talent
            let order = Talents.database.find(ele => ele.rank === talent.rank && ele.order > bound).order;
            // set lower bound
            talent.lower = order;
        }
    }

    // upper bound generation
    for (let i = pet.length - 1; i >= 0; i--) {
        let talent = pet[i];

        // if order already known, update upper and lower
        if (talent.order != -1) {
            talent.upper = talent.order;
            talent.lower = talent.order;

        // if last talent
        } else if (i === pet.length - 1) {
            // get first occurence of rank in DB
            let filtered = Talents.database.filter(ele => ele.rank === talent.rank);
            let order = filtered[filtered.length - 1].order;
            // set upper bound
            talent.upper = order;

        } else if (talent.order === -1) {
            let bound = pet[i + 1].upper;

            // set upper to last occurence of talent rank before previous talent
            let filtered = Talents.database.filter(ele => ele.rank === talent.rank && ele.order < bound);
            let order = filtered[filtered.length - 1].order;
            // set upper bound
            talent.upper = order;
        }
    }

    // count options for each slot
    for (let i  = 0; i < pet.length; i++) {
        let talent = pet[i];

        let filtered = Talents.database.filter(ele => ele.rank === talent.rank && ele.order >= talent.lower && ele.order <= talent.upper);
        let count = filtered.length - 1;
        talent.count = count;
    }

    return pet;
}