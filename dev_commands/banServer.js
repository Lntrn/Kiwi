// require discord.js module
const Discord = require("discord.js");
// require blacklist module
const Blacklist = require("../utilities/blacklist.js");
// require emojis.js module
const Emojis = require("../utilities/emojis.js");
// require format.js module
const Format = require("../utilities/format.js");
// require channels.js module
const Channels = require("../utilities/channels.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");
// require MongoDB Driver
const MongoDB = require("mongodb").MongoClient;

module.exports = {
    name: "banServer",
    description: "add a server to the blacklist",
    execute(bot, msg, args) {
        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));

        const serverID = args.shift();
        const reason = args.join(" ");

        blacklistServer(bot, msg, serverID, reason);

        const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(`🚫${Format.space(1)} **━━━ SERVER BLACKLISTED ━━━** ${Format.space(1)}🚫`)
            .setDescription(`**User:** <@${serverID}>`
                            + `\n**ID:** ${serverID}`
                            + `\n**Date:** ${Date()}`
                            + `\n**Reason:** ${reason}`)
            .addField("\u200b", "\u200b")
            .setFooter(Format.footer.text, Format.footer.image);

        bot.channels.cache.get(Channels.devCmds.id).send(embed).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "ping", err));
    }
}

async function blacklistServer(bot, msg, serverID, reason) {
    // create database client
    const dbClient = new MongoDB(process.env.MONGOURI, { useUnifiedTopology: true });

    try {
        await dbClient.connect();
        const db = dbClient.db("KiwiDB");
        const servers = db.collection("server-blacklist");

        await servers.findOneAndUpdate(
            { "_server": serverID },
            {
                $push: {
                    "_log": {
                        "date": Date(),
                        "reason": reason
                    }
                }
            },
            { upsert: true }
        );

        // update servers in local blacklist
        await Blacklist.load(false, true);

    } catch (err) {
        ErrorLog.log(bot, msg, serverID, `blacklisting server ${serverID} in database`, err);

    } finally {
        dbClient.close();
    }
}