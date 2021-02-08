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

module.exports = {
    name: "ping",
    description: "owner command to check bot's ping",
    execute(bot, msg, args) {
        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));

        const serverID = args.shift();
        const reason = args.join();

        blacklistServer(bot, msg, reason);

        const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(`🚫${Format.space(1)} **━━━ USER BLACKLISTED ━━━** ${Format.space(1)}🚫`)
            .setDescription(`**User:** <@${serverID}>`
                            + `\n**ID:** ${serverID}`
                            + `\n**Reason:** ${reason}`)
            .addField("\u200b", "\u200b")
            .setFooter(Format.footer.text, Format.footer.image);

        bot.channels.cache.get(Channels.devCmds.id).send(embed).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "ping", err));
    }
}

async function blacklistServer(bot, msg, reason) {
    // create database client
    const dbClient = new MongoDB(process.env.MONGOURI, { useUnifiedTopology: true });
    const serverID = msg.guild.id;

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

    } catch (err) {
        ErrorLog.log(bot, msg, serverID, `blacklisting server ${serverID} in database`, err);

    } finally {
        dbClient.close();
    }

    // update servers in local blacklist
    Blacklist.load(false, true);
}