// require discord.js module
const Discord = require("discord.js");
// require talent database
const Talents = require("./talents.js");
// require emojis.js module
const Emojis = require("../utilities/emojis.js");
// require format.js module
const Format = require("../utilities/format.js");

module.exports = {
    name: "lookup copy",
    aliases: "tss",
    description: "query the talent database",
    async execute(client, message, args) {

	    let argsArray = generateArgs(args);
        console.log(argsArray);

        let foundNames = [];
        let foundSchools = [];
        for (a = 0; a < argsArray.length; a++) {
            let arg = argsArray[a];
            let trimmed = arg.trim();
            if (Talents.schools.some(school => school === trimmed.toLowerCase())) {
                findSchool(trimmed, foundSchools);
            }
            findNames(trimmed, foundNames);
        }
        console.log(foundSchools)
        let nameSearch = [];
        let schoolSearch = [];
        prepareToSend(foundNames, nameSearch);
        prepareToSend(foundSchools, schoolSearch);
        //console.log(nameSearch)
        let desc = schoolSearch.join("\n");

        // create the embed
        let schoolEmbed = new Discord.MessageEmbed()
            .setColor("#F7D7C4")
            .setTitle(`📜 **━━━━━━ SCHOOL SEARCH ━━━━━━** 📜`)
            .setDescription(desc)
        //message.author.send(schoolEmbed)
        message.author.send(`📜 **━━━━━━ __SCHOOL SEARCH__ ━━━━━━** 📜`)
        message.author.send(desc, { split: true }).then(message.react(Emojis.greenCheck.id)).catch((error) => message.channel.send(`Turn on your dms ${message.author}`));

        // End name search

        // provided order

        // provided rank

        // provided flag

        // let talent = Talent.find()


        //msg.channel.send(info).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "pool", err));

        // log command use
        //Mongo.logCMD(bot, msg, msg.guild.id, "pool");
    }
}
function generateArgs(args) {
    // Joining the arguments in to one long string
    let argsStr = args.join(" ");
    // Making the entire string lower case
    let tem = argsStr.toLowerCase();
    // Splitting the string at each comma to get talent names
    return argsArray = tem.split(",");
}

function findNames(trimmed, foundNames) {
    if (trimmed.includes("-") || trimmed.includes("_")) {
        trimmed = trimmed.replace("-", " ");
        trimmed = trimmed.replace("_", " ");
    } 
    Talents.database.forEach(talent => {
        let name = talent.name.toLowerCase();
        //console.log(name)
        let removeDash = ["boon", "bringer", "giver", "dealer", "shot", "eye", "sniper", "away", "defy", "off", "it", "proof", "ward", "storm tooth", "power taker", "quick witted"];
		// Checking to see if any of the objects in the database contain a variable in the above array and replacing dashes to match the user input
		if (removeDash.some(b => name.includes(b))) {
		    name = name.replace("-", " ");
		}
        //console.log(name)
        if (name.toLowerCase().includes(trimmed)) {
            foundNames.push(talent);
        }
    });
}

function findSchool(trimmed, foundSchools) {
    for (talent of Talents.database) {
        if (talent.school === trimmed.toLowerCase()) {
            foundSchools.push(talent);
            //argsArray.splice(a, 1);
        }
    }
}
function prepareToSend(found, result) {
    for (talent of found) {
        let order;

        let str = talent.order.toString();
        if (str.length === 1) {
            order = "00" + talent.order;
        } else if (str.length === 2) {
            order = "0" + talent.order;
        } else if (str.length === 3) {
            order = talent.order
        }

        let rank;
        switch(talent.rank) {
            case 0: 
                rank = "`C `";
                break;
            case 1:
                rank = "`UC`";
                break;
            case 2:
                rank = "`R `";
                break;
            case 3:
                rank = "`UR`";
                break;
            case 4:
                rank = "`E `";
                break;
            default:
                rank = "`NA`";
        }
        let name;
        if (talent.url) {
            name = `${talent.name} / \`${talent.url}\``
        } else {
            name = `${talent.name} / No link available\``
        }
        result.push(`\`${order}\` \`${rank}\` ${name}`);
    }
    result.sort();
    return result;
}