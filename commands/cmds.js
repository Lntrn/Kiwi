// require discord.js module
const Discord = require("discord.js");
// require Javascript File Systems
const FS = require("fs");
const Path = require("path");
// require data.js module
const Data = require("../data.js");

module.exports = {
    name: "cmds",
    description: "owner command to check the command usage stats",
    execute(bot, msg) {
        // allow usage only if user is the owner
        if (msg.author.id === Data.ownerId) {
            const CMD = JSON.parse(FS.readFileSync(Path.resolve(__dirname, "../cmdData.json")));
            const servers = CMD.servers;
            let dataPrintout = "";

            // for all servers
            for (let server in servers) {
                dataPrintout += `\n**${servers[server].name}** [${server}]`

                // for all cmds in that server
                for (let cmd in servers[server]) {
                    dataPrintout += `\n${Data.space(10)} :white_small_square: ${cmd}: **${servers[server][cmd]}**`
                }
            }
            
            const embed = new Discord.MessageEmbed()
                .setColor("#D5AB88")
                .setTitle(":notebook_with_decorative_cover: **━━━━━ COMMAND STATS ━━━━━** :notebook_with_decorative_cover:")
                .setDescription(dataPrintout)
                .addField("\u200b", "\u200b")
                .setFooter(Data.footer.footer, Data.footer.image);

            msg.channel.send(embed).then(
                function(sentMsg) {
                    // generate reaction
                    sentMsg.react("💾");
                    // reaction filter
                    const filter = (reaction, user) => reaction.emoji.name === "💾" && user.id === msg.author.id;
                    // collector (parse for 10 seconds)
                    const collector = sentMsg.createReactionCollector(filter, {time: 60000});

                    collector.on("collect", 
                        function() {
                            bot.channels.cache.get(Data.cmdUsageId).send("**CMD USAGE:**", 
                                                                        {files : [Path.resolve(__dirname, "../cmdData.json")]});
                            bot.channels.cache.get(Data.cmdUsageId).send(Data.devReportRole);
                        }
                    );
                }
            );

        } else {
            const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
            .setDescription(`You must be the bot owner, ${Data.ownerMention}, to use this command!`)
            .addField("\u200b", "\u200b")
            .setFooter(Data.footer.footer, Data.footer.image);

            msg.channel.send(embed);
        }
    },
    updateData(bot, serverID, cmd) {
        let CMD = JSON.parse(FS.readFileSync(Path.resolve(__dirname, "../cmdData.json")));
        let servers = CMD.servers;

        // if the server doesn't already exists in the database, add it first
        if (!servers.hasOwnProperty(serverID)) {
            servers[serverID] = {
                "name": bot.guilds.cache.get(serverID).name,
                "bug": 0,
                "suggestion": 0,
                "invite": 0,
                "stats": 0,
                "help": 0,
                "unrecognized": 0
            };
        }
        
        // increment command count
        servers[serverID][cmd]++;

        FS.writeFileSync(Path.resolve(__dirname, "../cmdData.json"), JSON.stringify(CMD));
    }
}