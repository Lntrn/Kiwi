// require MongoDB Driver
const MongoDB = require("mongodb").MongoClient;
// require config.js module
const Config = require("./config.js");

module.exports = {
    "users": [ ],
    "servers": [ ],
    async load(users, servers) {
        // create database client
        const dbClient = new MongoDB(process.env.MONGOURI, { useUnifiedTopology: true });

        try {
            await dbClient.connect();
            const db = dbClient.db("KiwiDB");

            // if users to be updated
            if (users) {
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
            if (servers) {
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
    }
}