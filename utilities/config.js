const Mongo = require("./mongo.js");

module.exports = {
    devmode: true,
    update: false,
    defaultPrefix: "!k",
    prefix(bot, msg) {
        return prefix = Mongo.getPrefix(bot, msg);
    }
}