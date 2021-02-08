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
    name: "banUser",
    description: "add a user to the blacklist",
    execute(bot, msg, args) {
        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));

        const userID = args.shift();
        const reason = args.join(" ");

        blacklistUser(bot, msg, userID, reason);

        const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(`🚫${Format.space(1)} **━━━━━ USER BLACKLISTED ━━━━━** ${Format.space(1)}🚫`)
            .setDescription(`**User:** <@${userID}>`
                            + `\n**ID:** ${userID}`
                            + `\n**Date:** ${Date()}`
                            + `\n**Reason:** ${reason}`)
            .addField("\u200b", "\u200b")
            .setFooter(Format.footer.text, Format.footer.image);

        bot.channels.cache.get(Channels.devCmds.id).send(embed).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "banUser", err));
    }
}

async function blacklistUser(bot, msg, userID, reason) {
    // create database client
    const dbClient = new MongoDB(process.env.MONGOURI, { useUnifiedTopology: true });

    try {
        await dbClient.connect();
        const db = dbClient.db("KiwiDB");
        const users = db.collection("user-blacklist");

        await users.findOneAndUpdate(
            { "_user": userID },
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
        
        // update users in local blacklist
        await Blacklist.load(true, false);

    } catch (err) {
        ErrorLog.log(bot, msg, msg.guild.id, `blacklisting user ${userID} in database`, err);

    } finally {
        dbClient.close();
    }
}