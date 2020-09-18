// require discord.js module
const Discord = require("discord.js");
// require MongoDB Driver
const MongoDB = require("mongodb").MongoClient;
// require dotenv-flow to load environment variables
require("dotenv-flow");
// require data.js module
const Data = require("../utilities/data.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "cmds",
    description: "owner command to check the command usage stats",
    async execute(bot, msg) { // card_box 9AAAB4
        // allow usage only if user is the owner
        if (msg.author.id === Data.ownerId) {

            // create database client
            const dbClient = new MongoDB(process.env.MONGOURI, { useUnifiedTopology: true });

            try {
                await dbClient.connect();

                const db = dbClient.db("KiwiDB");

                // fetch command usage data here

            } catch (err) {
                ErrorLog.log(bot, msg, msg.guild.id, "collecting data for cmd command", err);

            } finally {
                dbClient.close();
            }

        } else {
            const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
            .setDescription(`You must be the bot owner, ${Data.ownerMention}, to use this command!`)
            .addField("\u200b", "\u200b")
            .setFooter(Data.footer.text, Data.footer.image);

            bot.channels.cache.get(Data.devCmds).send(embed).catch(err => ErrorLog.log(bot, msg, msg.guild.id, "cmds [not dev response]", err));
        }
    }
}