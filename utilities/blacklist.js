// require discord.js module
const Discord = require("discord.js");
// require config.js module
const Config = require("./config.js");
// require emojis.js module
const Emojis = require("../utilities/emojis.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");
// require format.js module
const Format = require("../utilities/format.js");
// require MongoDB Driver
const MongoDB = require("mongodb").MongoClient;

module.exports = {
    async load(userUpdate, serverUpdate) {
        const success = true;

        // create database client
        const dbClient = new MongoDB(process.env.MONGOURI, { useUnifiedTopology: true });

        try {
            await dbClient.connect();
            const db = dbClient.db("KiwiDB");

            // if users to be updated
            if (userUpdate) {
                const col = db.collection("user-blacklist");
                
                const cursor = await col.find({});
                const userList = await cursor.toArray();

                module.exports.users = userList ? userList : [];
            }

            // if servers to be updated
            if (serverUpdate) {
                const col = db.collection("server-blacklist");

                const cursor = await col.find({});
                const serverList = await cursor.toArray();

                module.exports.servers = serverList ? serverList : [];
            }

        } catch (err) {
            ErrorLog.log(bot, msg, Config.supportID, `downloading blacklists from database`, err);
            success = false;

        } finally {
            dbClient.close();
        }

        return success;
    },
    userBlacklisted(bot, msg, reason) {
        const response = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(`🚫${Format.space(1)} **━━━━━━━━ USER BLACKLISTED ━━━━━━━━** ${Format.space(1)}🚫`)
            .setDescription(`Due to abuse of the bot, **you** have been **blacklisted** from using ${Emojis.kiwi.pub} **Kiwi**`
                            + `\nYou will no longer be able to access the bot in *any* server`
                            + `\n\nReason for ban: \n${reason}`
                            + `\n\n If you believe this is a mistake, please submit a request to be removed from the blacklist in our [Support Server](${Format.supportLink})`)
            .addField("\u200b", "\u200b")
            .setFooter(Format.footer.text, Format.footer.image);

        msg.channel.send(response).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "blacklisted user response", err));
    },
    serverBlacklisted(bot, msg, reason) {
        const response = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(`🚫${Format.space(1)} **━━━━━━━━ SERVER BLACKLISTED ━━━━━━━━** ${Format.space(1)}🚫`)
            .setDescription(`Due to abuse of the bot, **this server** has been **blacklisted** from using ${Emojis.kiwi.pub} **Kiwi**`
                            + `\nKiwi's commands will no longer work in this server`
                            + `\n\nReason for ban: \n${reason}`
                            + `\n\n If you believe this is a mistake, please submit a request to have this server removed from the blacklist in our [Support Server](${Format.supportLink})`)
            .addField("\u200b", "\u200b")
            .setFooter(Format.footer.text, Format.footer.image);

        msg.channel.send(response).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "blacklisted user response", err));
    }
}