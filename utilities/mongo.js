// require discord.js module
const Discord = require("discord.js");
// require MongoDB Driver
const MongoDB = require("mongodb").MongoClient;
const { ObjectID } = require("mongodb");
// require dotenv-flow to load environment variables
require("dotenv-flow");
// require channels.js module
const Channels = require("../utilities/channels.js");
// require format.js module
const Format = require("../utilities/format.js");
// require error logger module
const ErrorLog = require("./error.js");

module.exports = {
    name: "mongo",
    description: "database accessor",
    async logCMD(bot, msg, serverID, cmd) {
        // only log if not testing
        if (msg.channel.id !== Channels.personalTesting.id && msg.channel.id !== Channels.devTesting.id) {
            date = new Date();

            const log = new Discord.MessageEmbed()
                .setColor("#FEE7B8")
                .setTitle(":dividers: **━━━━━ COMMAND LOG ━━━━━** :dividers:")
                .setDescription(`**Command Used:** ${cmd}`
                                + `\n**User:** ${msg.author}`
                                + `\n**Server:** ${bot.guilds.cache.get(serverID).name}`
                                + `\n**Channel:** ${msg.channel}`
                                + `\n**Date:** ${date.toDateString()}`)
                .setFooter(Format.footer.text, Format.footer.image);

            bot.channels.cache.get(Channels.cmdLog.id).send(log).catch(err => ErrorLog.log(bot, msg, msg.guild.id, `cmd logging [${cmd}]`, err));
        
            // create database client
            const dbClient = new MongoDB(process.env.MONGOURI, { useUnifiedTopology: true });

            try {
                await dbClient.connect();
                const db = dbClient.db("KiwiDB");

                // remove extraneous command data for unrecognized command 
                if (cmd.includes("unrecognized"))
                    cmd = "unrecognized";

                await new Promise((resolve) => {
                    resolve(module.exports.updateCommands(db, cmd, bot, msg, serverID));
                });
                await new Promise((resolve) => {
                    resolve(module.exports.updateServers(db, cmd, bot, msg, serverID));
                });
                await new Promise((resolve) => {
                    resolve(module.exports.updateUsers(db, cmd, bot, msg, serverID));
                });                

            } catch (err) {
                ErrorLog.log(bot, msg, serverID, `logging cmd: **${cmd}** to database`, err);

            } finally {
                dbClient.close();
            }
        }

    },
    async updateCommands(db, cmd, bot, msg, serverID) {
        const commands = db.collection("commands");

        try {            
            await commands.findOneAndUpdate(
                { "_command": cmd },
                {
                    $inc: { "_total": 1 },
                    $push: {
                        "uses": {
                            "_id": new ObjectID,
                            "user": msg.author.id,
                            "server": serverID,
                            "date": Date()
                        }
                    }
                },
                { upsert: true }
            );

        } catch (err) {
            ErrorLog.log(bot, msg, serverID, `updating commands collection: **${cmd}**`, err);
        }

    },
    async updateServers(db, cmd, bot, msg, serverID) {
        const servers = db.collection("servers");

        try {
            await servers.findOneAndUpdate(
                { "_server": serverID },
                { 
                    $inc: { 
                        "_total": 1,
                        [`${cmd}._total`]: 1
                    },
                    $push: {
                        [`${cmd}.uses`]: {
                            "_id": new ObjectID,
                            "user": msg.author.id,
                            "date": Date()
                        }
                    }
                },
                { upsert: true }
            );

        } catch (err) {
            ErrorLog.log(bot, msg, serverID, `updating servers collection: **${cmd}**`, err);
        }

    },
    async updateUsers(db, cmd, bot, msg, serverID) {
        const users = db.collection("users");

        try {
            await users.findOneAndUpdate(
                { "_user": msg.author.id },
                {
                    $inc: { 
                        "_total": 1,
                        [`${cmd}._total`]: 1
                    },
                    $push: {
                        [`${cmd}.uses`]: {
                            "_id": new ObjectID,
                            "server": serverID,
                            "date": Date()
                        }
                    }
                },
                { upsert: true }
            );
        } catch (err) {
            ErrorLog.log(bot, msg, serverID, `updating users collection: **${cmd}**`, err);
        }

    },
    async updatePrefix(bot, msg, newPrefix) {
        // create database client
        const dbClient = new MongoDB(process.env.MONGOURI, { useUnifiedTopology: true });
        const serverID = msg.guild.id;

        try {
            await dbClient.connect();
            const db = dbClient.db("KiwiDB");
            const servers = db.collection("servers");

            await servers.findOneAndUpdate(
                { "_server": serverID },
                {
                    $set: {
                        "_prefix": newPrefix
                    }
                },
                { upsert: true }
            );

        } catch (err) {
            ErrorLog.log(bot, msg, serverID, `updating server prefix for ${msg.guild.name} [${serverID}] to '${newPrefix}' in database`, err);

        } finally {
            dbClient.close();
        }
    },
    async blacklistUser(bot, msg, reason) {
        // create database client
        const dbClient = new MongoDB(process.env.MONGOURI, { useUnifiedTopology: true });
        const userID = msg.author.id;

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

        } catch (err) {
            ErrorLog.log(bot, msg, msg.server.id, `blacklisting user ${userID} in database`, err);

        } finally {
            dbClient.close();
        }
    },
    async blacklistServer(bot, msg, reason) {
        // create database client
        const dbClient = new MongoDB(process.env.MONGOURI, { useUnifiedTopology: true });
        const serverID = msg.server.id;

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
            ErrorLog.log(bot, msg, serverID, `blacklisting user ${serverID} in database`, err);

        } finally {
            dbClient.close();
        }
    },
    async checkUserBlacklist(bot, msg) {
        // create database client
        const dbClient = new MongoDB(process.env.MONGOURI, { useUnifiedTopology: true });
        const userID = msg.author.id;

        try {
            await dbClient.connect();
            const db = dbClient.db("KiwiDB");
            const servers = db.collection("user-blacklist");

            const target = await servers.findOne(
                { "_user": userID },
                (error, result) => {
                    if (result)
                        return true;
                    else
                        return false;
                }
            );

            if (target)
                return true;
            else
                return false;

        } catch (err) {
            ErrorLog.log(bot, msg, msg.server.id, `checking if user ${userID} is in database blacklist`, err);

        } finally {
            dbClient.close();
        }
    },
    async checkServerBlacklist(bot, msg) {
        // create database client
        const dbClient = new MongoDB(process.env.MONGOURI, { useUnifiedTopology: true });
        const serverID = msg.server.id;

        try {
            await dbClient.connect();
            const db = dbClient.db("KiwiDB");
            const servers = db.collection("server-blacklist");

            const target = await servers.findOne(
                { "_server": serverID },
                (error, result) => {
                    if (result)
                        return true;
                    else
                        return false;
                }
            );

            if (target)
                return true;
            else
                return false;

        } catch (err) {
            ErrorLog.log(bot, msg, serverID, `checking if user ${serverID} is in database blacklist`, err);

        } finally {
            dbClient.close();
        }
    }
}