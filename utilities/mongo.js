// require discord.js module
const Discord = require("discord.js");
// require MongoDB Driver
const MongoDB = require("mongodb").MongoClient;
// require dotenv-flow to load environment variables
require("dotenv-flow");
// require data.js module
const Data = require("./data.js");
// require error logger module
const ErrorLog = require("./error.js");

module.exports = {
    name: "mongo",
    description: "database accessor",
    async logCMD(bot, msg, serverID, cmd) { // SUCCESS: 77B255 ERROR: DD2E44
        // only log if not testing
        if (msg.channel.id !== Data.testingId) {
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
        }

        // create database client
        const dbClient = new MongoDB(process.env.MONGOURI);

        try {
            await dbClient.connect();
            await bot.channels.cache.get(Data.cmdUsageId).send("connected to mongoDB!");

        } catch (err) {
            ErrorLog.log(bot, msg, serverID, `logging cmd: **${cmd}** to database`, err);

        } finally {
            dbClient.close();
        }

    },
    async updateUser() {

    },
    async updateServer() {

    }
}