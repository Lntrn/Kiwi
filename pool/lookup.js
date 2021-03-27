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
    execute(client, message, args) {

        // Joining the arguments in to one long string
	    let argsStr = args.join(" ");
	    // Making the entire string lower case
	    let tem = argsStr.toLowerCase();
	    // Splitting the string at each comma to get talent names
	    let argsArray = tem.split(",");

        let found = [];

        for (arg of argsArray) {
            // Removing spaces at the start and end of each talent
		    let trimmed = arg.trim();

		    // Replacing dashes and undersoces with spaces
		    if (trimmed.includes("-") || trimmed.includes("_")) {
			    trimmed = trimmed.replace("-", " ");
			    trimmed = trimmed.replace("_", " ");
		    } 
            console.log(trimmed)

            let v = 0;
            Talents.database.filter(tal => {
                let name = tal.name.toLowerCase();
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
        console.log(found)

        let data = [];

        // generate printout
        for (tal of found) {
            let talent = Talents.database[tal];
            let name;

            let str = talent.order.toString()

            if (str.length === 1) {
                talent.order = "  " + talent.order// + " ";
            } else if (str.length === 2) {
                talent.order = " " + talent.order;
            }

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
            if (talent.url) {
                name = `[${talent.name}](${talent.url})`
            } else {
                name = `${talent.name}`
            }
            data.push(`\`${talent.order}\` \`${rank}\` ${name}`);
        }
        data.sort();

        let desc = data.join("\n");

        const read = new Discord.MessageEmbed()
            .setColor("#F7D7C4")
            .setTitle(`📜 **━━━━━━ TALENT SEARCH ━━━━━━** 📜`)
            .setDescription(desc)

        message.channel.send(read)

        // provided order

        // provided name

        // provided school

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