// require MongoDB Driver
const MongoDB = require("mongodb").MongoClient;
// require error logger module
const ErrorLog = require("./error.js");

module.exports = {
    devmode: false,
    loaded: false,
    defaultPrefix: "!k",
    universalPrefix: { //@'ing Kiwi
        v1: "<@!743944201682681937>",
        v2: "<@743944201682681937>"
    },
    devmodePrefix: "k",
    developers: ["193427298958049280", "750304052184612865"],
    ownerID: "193427298958049280",
    supportID: "744856371417186385",
    async prefix(bot, msg) {
        // if in devmode, only respond to devmode prefix
        if (module.exports.devmode)
            return module.exports.devmodePrefix;

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

            if (serverData !== null && serverData.hasOwnProperty("_prefix"))
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