// require discord.js module
const Discord = require("discord.js");
// require Javascript File Systems
const FS = require("fs");
const Path = require("path");
// require data.js module
const Data = require("../utilities/data.js");

module.exports = {
    name: "cmds",
    description: "owner command to check the command usage stats",
    execute(bot, msg) {
        // allow usage only if user is the owner
        if (msg.author.id === Data.ownerId) {
            const CMD = JSON.parse(FS.readFileSync(Path.resolve(__dirname, "../cmdData.json")));
            const servers = CMD.servers;
            let dataPrintout = "";
            let updated = false;
            let bug = 0, suggestion = 0, invite = 0, stats = 0, help = 0, unrecognized = 0;

            // for all servers
            for (let server in servers) {
                dataPrintout += `\n**${servers[server].name}** [${server}]`

                // for all cmds in that server
                for (let cmd in servers[server]) {
                    if (cmd !== "new") {
                        if (cmd === "name" && servers[server]["new"] === true) {
                            dataPrintout += `\n${Data.space(10)} :white_small_square: ${cmd}: **${servers[server][cmd]}** 🚩`;
                            servers[server]["new"] = false;
                            
                        } else {
                            dataPrintout += `\n${Data.space(10)} :white_small_square: ${cmd}: **${servers[server][cmd]}**`;
                        }
                    }
                    
                    if (cmd === "bug")
                        bug += servers[server][cmd];
                    else if (cmd === "suggestion")
                        suggestion += servers[server][cmd];
                    else if (cmd === "invite")
                        invite += servers[server][cmd];
                    else if (cmd === "stats")
                        stats += servers[server][cmd];
                    else if (cmd === "help")
                        help += servers[server][cmd];
                    else if (cmd === "unrecognized")
                        unrecognized += servers[server][cmd];
                }
            }
            
            const embed = new Discord.MessageEmbed()
                .setColor("#9AAAB4")
                .setTitle(":card_box: **━━━━━ COMMAND STATS ━━━━━** :card_box:")
                .setDescription( `Total Commands Used: **${bug + suggestion + invite + stats + help + unrecognized}**`
                            + `\nbug: **${bug}** ${Data.space(4)} suggestion: **${suggestion}** ${Data.space(4)} invite: **${invite}**`
                            + `\nstats: **${stats}** ${Data.space(4)} help: **${help}** ${Data.space(4)} unrecognized: **${unrecognized}**`
                            + `\n${dataPrintout}`)
                .addField("\u200b", "\u200b")
                .setFooter(Data.footer.text, Data.footer.image);

            msg.channel.send(embed).then(
                function(sentMsg) {
                    let date = new Date();
                    // generate reaction
                    sentMsg.react("💾");
                    // reaction filter
                    const filter = (reaction, user) => reaction.emoji.name === "💾" && user.id === msg.author.id;
                    // collector (parse for 10 seconds)
                    const collector = sentMsg.createReactionCollector(filter, {time: 60000});

                    FS.writeFile(Path.resolve(__dirname, "../cmdData.json"), JSON.stringify(CMD),
                        function (err) {
                            if (err) {
                                const error = new Discord.MessageEmbed()
                                    .setColor("#DD2E44")
                                    .setTitle(":exclamation: **━━━━━ CMDS COMMAMND ERROR ━━━━━** :exclamation:")
                                    .setDescription(`**Error:**\n${err}`)
                                    .setFooter(Data.footer.text, Data.footer.image);
            
                                bot.channels.cache.get(Data.cmdUsageId).send(error);
            
                            } else {
                                const success = new Discord.MessageEmbed()
                                    .setColor("#77B255")
                                    .setTitle(":white_check_mark: **━━━━━ CMDS COMMAND SUCCESS ━━━━━** :white_check_mark:")
                                    .setDescription(`File written successfully!\n\nRemoved "new" status of **${servers[server][name]}**`)
                                    .setFooter(Data.footer.text, Data.footer.image);
            
                                bot.channels.cache.get(Data.cmdUsageId).send(success);
                            }
                        }
                    );

                    collector.on("collect", 
                        function() {
                            bot.channels.cache.get(Data.cmdUsageId).send(`**CMD USAGE** (${date.getMonth()}/${date.getDate()}/${date.getFullYear()})**:**`, 
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
            .setFooter(Data.footer.text, Data.footer.image);

            msg.channel.send(embed);
        }
    },
    updateData(bot, author, serverID, cmd) {
        let CMD = JSON.parse(FS.readFileSync(Path.resolve(__dirname, "../cmdData.json")));
        let servers = CMD.servers;

        // if the server doesn't already exists in the database, add it first
        if (!servers.hasOwnProperty(serverID)) {
            servers[serverID] = {
                "name": bot.guilds.cache.get(serverID).name,
                "count": 0,
                "bug": 0,
                "suggestion": 0,
                "invite": 0,
                "stats": 0,
                "help": 0,
                "unrecognized": 0,
                "new": true
            };
        }
        
        // increment command count
        servers[serverID][cmd]++;
        servers[serverID]["count"]++;

        FS.writeFile(Path.resolve(__dirname, "../cmdData.json"), JSON.stringify(CMD),
            function (err) {
                if (err) {
                    const error = new Discord.MessageEmbed()
                        .setColor("#DD2E44")
                        .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
                        .setDescription(`**Error:** ${err}`
                                        + `\n\n**Command Used:** ${cmd}`
                                        + `\n**User:** ${author}`
                                        + `\n**Server:** ${bot.guilds.cache.get(serverID).name}`)
                        .setFooter(Data.footer.text, Data.footer.image);

                    bot.channels.cache.get(Data.cmdLog).send(error);

                } else {
                    const success = new Discord.MessageEmbed()
                        .setColor("#77B255")
                        .setTitle(":white_check_mark: **━━━━━ SUCCESS ━━━━━** :white_check_mark:")
                        .setDescription("File written successfully!"
                                        + `\n\n**Command Used:** ${cmd}`
                                        + `\n**User:** ${author}`
                                        + `\n**Server:** ${bot.guilds.cache.get(serverID).name}`)
                        .setFooter(Data.footer.text, Data.footer.image);

                    bot.channels.cache.get(Data.cmdLog).send(success);
                }
            });
    },
    cmdLog(bot, msg, serverID, cmd) {
        // only log if not testing
        if (msg.channel.id !== Data.testingId) {
            date = new Date();

            const log = new Discord.MessageEmbed()
                .setColor("#FEE7B8")
                .setTitle(":dividers: **━━━━━ COMMAND LOG ━━━━━** :dividers:")
                .setDescription(`**Command Used:** ${cmd}`
                                + `\n**User:** ${msg.author}`
                                + `\n**Server:** ${bot.guilds.cache.get(serverID).name}`
                                + `\n**Channel:** ${msg.channel}`
                                + `\n**Date:** ${date.toDateString()}`)
                .setFooter(Data.footer.text, Data.footer.image);

            bot.channels.cache.get(Data.cmdLog).send(log);
        }
    }
}