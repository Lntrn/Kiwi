// require discord.js module
const Discord = require("discord.js");
// require MongoDB Driver
const MongoDB = require("mongodb").MongoClient;
const { ObjectID } = require("mongodb");
// require dotenv-flow to load environment variables
require("dotenv-flow");
// require data.js module
const Data = require("./data.js");
// require error logger module
const ErrorLog = require("./error.js");
// require Config
const Config = require("./config.js");

module.exports = {
    name: "mongo",
    description: "database accessor",
    async logCMD(bot, msg, serverID, cmd) {
        // only log if not testing
        if (msg.channel.id !== Data.personalTestingId && msg.channel.id !== Data.devTestingId) {
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

            bot.channels.cache.get(Data.cmdLog).send(log).catch(err => ErrorLog.log(bot, msg, msg.guild.id, `cmd logging [${cmd}]`, err));
        
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
    async getPrefix(bot, msg) {
        // create database client
        const dbClient = new MongoDB(process.env.MONGOURI, { useUnifiedTopology: true });
        const serverID = msg.guild.id;

        try {
            await dbClient.connect();
            const db = dbClient.db("KiwiDB");
            const servers = db.collection("servers");

            const serverData = await servers.findOne( { "_server" : serverID } );

            if (serverData.hasOwnProperty("_prefix"))
                return serverData._prefix;
            else
                return Config.defaultPrefix;

        } catch (err) {
            ErrorLog.log(bot, msg, serverID, `getting server prefix for ${msg.guild.name} [${serverID}] from database`, err);

        } finally {
            dbClient.close();
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
    }
}