// require MongoDB Driver
const MongoDB = require("mongodb").MongoClient;
// require config.js module
const Config = require("./config.js");

module.exports = {
    "users": [ ],
    "servers": [ ],
    async load(userUpdate, serverUpdate) {
        // create database client
        const dbClient = new MongoDB(process.env.MONGOURI, { useUnifiedTopology: true });

        try {
            await dbClient.connect();
            const db = dbClient.db("KiwiDB");

            // if users to be updated
            if (userUpdate) {
                const users = db.collection("user-blacklist");

                const userList = await users.find({}).toArray(
                    (err, result) => {
                        if (err)
                            return null;
                        else
                            return result;
                    }
                );
    
                module.exports.users = userList ? userList : [];
            }

            // if servers to be updated
            if (serverUpdate) {
                const servers = db.collection("server-blacklist");

                const serverList = await servers.find({}).toArray(
                    (err, result) => {
                        if (err)
                            return null;
                        else
                            return result;
                    }
                );
    
                module.exports.servers = serverList ? serverList : [];
            }

        } catch (err) {
            ErrorLog.log(bot, msg, Config.supportID, `downloading blacklists from database`, err);

        } finally {
            dbClient.close();
        }
    },
    userBlacklisted(bot, msg, reason) {
        const response = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(`🚫${Format.space(1)} **━━━━━━━━ USER BLACKLISTED ━━━━━━━━** ${Format.space(1)}🚫`)
            .setDescription(`Due to abuse of the bot, **you** have been **blacklisted** from using ${Emojis.kiwi.pub} **Kiwi**`
                            + `\nYou will no longer be able to access the bot in any server`
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