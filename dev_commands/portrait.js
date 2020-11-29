// require discord.js module
const Discord = require("discord.js");
// require Config module
const Config = require("../utilities/config.js");
// require emojis.js module
const Emojis = require("../utilities/emojis.js");
// require format.js module
const Format = require("../utilities/format.js");
// require channels.js module
const Channels = require("../utilities/channels.js");
// require error logger module
const ErrorLog = require("../utilities/error.js");

module.exports = {
    name: "portrait",
    description: "manually update owner portrait in footer",
    async execute(bot, msg) {
        // react to command
        msg.react(bot.emojis.cache.get(Emojis.kiwi.id));
        
        try {
            const owner = await bot.users.fetch(Config.ownerID);

            // update owner profile image
            Format.footer.image = owner.avatarURL();
            
            await bot.channels.cache.get(Channels.devCmds.id).send(`:white_check_mark: ${Format.space(1)} Owner portrait **sucessfully** updated!`);

        } catch (err) {
            ErrorLog.log(bot, msg, msg.guild.id, "portrait", err);
        }
    }
}