// require MongoDB Driver
const MongoDB = require("mongodb").MongoClient;
// require error logger module
const ErrorLog = require("./error.js");

module.exports = {
    devmode: true,
    update: false,
    defaultPrefix: "!k",
    ownerID: "193427298958049280",
    async prefix(bot, msg) {
        // create database client
        const dbClient = new MongoDB(process.env.MONGOURI, { useUnifiedTopology: true });
        
        // null check
        if (msg.guild === null)
            return module.exports.defaultPrefix;

        const serverID = msg.guild.id;

        try {
            await dbClient.connect();
            const db = dbClient.db("KiwiDB");
            const servers = db.collection("servers");

            const serverData = await servers.findOne( { "_server" : serverID } );

            if (serverData.hasOwnProperty("_prefix"))
                return serverData._prefix;
            else
                return module.exports.defaultPrefix;

        } catch (err) {
            ErrorLog.log(bot, msg, serverID, `getting server prefix for ${msg.guild.name} [${serverID}] from database`, err);

        } finally {
            dbClient.close();
        }
    }
}