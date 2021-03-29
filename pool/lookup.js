// require discord.js module
const Discord = require("discord.js");
// require talent database
const Talents = require("./talents.js");
// require emojis.js module
const Emojis = require("../utilities/emojis.js");
// require format.js module
const Format = require("../utilities/format.js");

module.exports = {
    name: "lookup",
    aliases: "ts",
    description: "query the talent database",
    async execute(client, message, args) {

        // Joining the arguments in to one long string
	    let argsStr = args.join(" ");
	    // Making the entire string lower case
	    let tem = argsStr.toLowerCase();
	    // Splitting the string at each comma to get talent names
	    let argsArray = tem.split(",");

        let found = [];

        let foundSchool = [];

        for (a = 0; a < argsArray.length; a++) {
            let arg = argsArray[a]
            // Removing spaces at the start and end of each talent
            let trimmed = arg.trim();

            // Start school search

            if (Talents.schools.some(school => school === trimmed.toLowerCase())) {
                for (talent of Talents.database) {
                    if (talent.school === trimmed.toLowerCase()) {
                        foundSchool.push(talent);
                        argsArray.splice(a, 1);
                    }
                    console.log(argsArray)
                }
                let data1 = [];
                for (tal of foundSchool) {
                    // Prepare the name, add a link to the wiki page after the name if possible
                    let name;
                    if (tal.url) {
                        name = `${tal.name} / \`${tal.url}\``
                    } else {
                        name = `${tal.name} / No link available`
                    }
                    // Make the rank look nice
                    let rank;
                    switch(tal.rank) {
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
                    // Make the talent priority look nice
                    let order;
                    let str = tal.order.toString();
                    if (str.length === 1) {
                        order = "00" + tal.order;
                    } else if (str.length === 2) {
                        order = "0" + tal.order;
                    } else if (str.length === 3) {
                        order = tal.order;
                    }
        
                    // Push all of the found talents in to an array in a format almost ready to send
                    data1.push(`\`${order}\` \`${rank}\` ${name}`);
                }
                // sort the array
                data1.sort();
                // Join each talent's prepared message with a new line
                let desc = data1.join("\n");

                // create the embed
                let schoolEmbed = new Discord.MessageEmbed()
                    .setColor("#F7D7C4")
                    .setTitle(`📜 **━━━━━━ SCHOOL SEARCH ━━━━━━** 📜`)
                    .setDescription(desc)
                //message.author.send(schoolEmbed)
                message.author.send(`📜 **━━━━━━ __SCHOOL SEARCH__ ━━━━━━** 📜`)
                message.author.send(desc, { split: true }).then(message.react(Emojis.greenCheck.id)).catch((error) => message.channel.send(`Turn on your dms ${message.author}`));
            }

            // End school search
            // Start name search

		    // Replacing dashes and undersoces with spaces
		    if (trimmed.includes("-") || trimmed.includes("_")) {
			    trimmed = trimmed.replace("-", " ");
			    trimmed = trimmed.replace("_", " ");
		    } 
            console.log(trimmed)

            let v = 0;
            Talents.database.filter(ta => {
                let name = ta.name.toLowerCase();
                //console.log(name)
                let removeDash = ["boon", "bringer", "giver", "dealer", "shot", "eye", "sniper", "away", "defy", "off", "it", "proof", "ward", "storm tooth", "power taker", "quick witted"];
		        // Checking to see if any of the arguments contain a variable in the above array
		        if (removeDash.some(b => name.includes(b))) {
			        name = name.replace("-", " ");
		        }
                //console.log(name)
                if (name.toLowerCase().includes(trimmed)) {
                    found.push(v);
                }
                v++;
            });
        }
        console.log(found);

        let data2 = [];

        // generate printout
        for (tal of found) {
            let talent = Talents.database[tal];
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
            data2.push(`\`${order}\` \`${rank}\` ${name}`);
        }
        data2.sort();

        let desc2 = data2.join("\n");
        console.log(desc2.length)

        const read = new Discord.MessageEmbed()
            .setColor("#F7D7C4")
            .setTitle(`📜 **━━━━━━ TALENT SEARCH ━━━━━━** 📜`)
            .setDescription(desc2)

        message.channel.send(desc2, { split: true });

        // End name search

        // provided order

        // provided rank

        // provided flag

        // let talent = Talent.find()

        const info = new Discord.MessageEmbed()
            .setColor("#83BEEC")
            .setTitle(`🔍 **━━━━━━ TALENT LOOKUP ━━━━━━** 🔍`)
            .addField("\u200b", "\u200b")
            .setFooter(Format.footer.text, Format.footer.image);

        //msg.channel.send(info).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "pool", err));

        // log command use
        //Mongo.logCMD(bot, msg, msg.guild.id, "pool");
    }
}