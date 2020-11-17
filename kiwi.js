// created by Adam Elaoud (Sap#5703)
// copyright (c) 2020

// require discord.js module
const Discord = require("discord.js");
// require Javascript File System
const FS = require("fs");
// require dotenv-flow to load environment variables
require("dotenv-flow").config();
// require Config module
const Config = require("./utilities/config.js");


// create new bot
const bot = new Discord.Client();
// create collection of bot commands / events 
bot.commands = new Discord.Collection();
bot.devCommands = new Discord.Collection();
bot.events = new Discord.Collection();

// fill command collection
const commandFiles = FS.readdirSync("./commands");
for (const file of commandFiles) {
	let command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

// fill dev command collection
const devCommandFiles = FS.readdirSync("./dev_commands");
for (const file of devCommandFiles) {
	let command = require(`./dev_commands/${file}`);
	bot.devCommands.set(command.name, command);
}

// fill event collection
const eventFiles = FS.readdirSync("./events");
for (const file of eventFiles) {
	let event = require(`./events/${file}`);
	bot.events.set(event.name, event);
}

bot.on("ready", async () => {
	bot.user.setActivity(`🐸 Use ${Config.defaultPrefix} help`);
	console.log(`Logged in as ${bot.user.tag}!`);
	
	// send launch notification
	try {
		const owner = await bot.users.fetch(Config.ownerID);
		let date = new Date();
		owner.send("Bot Online! **" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "**");

	} catch (err) {
		console.log("Error sending message! Error: ", err.message);
	}
});

bot.on("message", async (message) => {
	// if in devmode, only respond to dev
	if (Config.devmode && message.author.id !== Config.ownerID) {
		return;
	}

	const prefix = await Config.prefix(bot, message); // promise rejection handled internally
	const prefixCheck = message.content.substr(0, prefix.length);

	// if another bot sent the message, if it has attachments, or if the prefix wasn't used, do nothing
	if (message.author.bot || message.attachments.size !== 0 || prefixCheck.toLowerCase() !== prefix.toLowerCase())
		return;

	// parsing command and arguments beginning after the prefix
	let args = message.content.substring(prefix.length).split(/[\s|\r?\n|\r]/);
	// remove any remaining empty space
	args = args.filter(ele => ele !== "" && ele !== " ");
	// retrieve command
	command = args.shift();

	// checking command request
	switch(command) {
		// Commands
		case "stats":
			bot.commands.get("stats").execute(bot, message, args);
			break;
		case "help":
			bot.commands.get("help").execute(bot, message);
			break;
		case "invite":
			bot.commands.get("invite").execute(bot, message);
			break;
		case "bug":
			bot.commands.get("bug").execute(bot, message, args);
			break;
		case "suggest":
			bot.commands.get("suggest").execute(bot, message, args);
			break;
		case "prefix":
			bot.commands.get("prefix").execute(bot, message, args);
			break;
		case "formulas":
			bot.commands.get("formulas").execute(bot, message);
			break;

		// Dev Commands
		case "ping":
			if (message.author.id === Config.ownerID)
				bot.devCommands.get("ping").execute(bot, message);
			break;
		case "servers":
			if (message.author.id === Config.ownerID)
				bot.devCommands.get("servers").execute(bot, message);
			break;
		// case "cmds":
		// 	if (message.author.id === Config.ownerID)
		// 		bot.devCommands.get("cmds").execute(bot, message);
		// 	break;

		// Ignore
		case "ick":
			// do nothing (ignores MEE6 kick command)
			break;

		// Default
		default:
			bot.commands.get("unrecognized").execute(bot, message, command);
	}
});

bot.on("guildCreate", guild => {
	bot.events.get("guildCreate").execute(bot, guild);
});

bot.on("guildDelete", guild => {
	bot.events.get("guildDelete").execute(bot, guild);
});

bot.on("guildUpdate", (oldGuild, newGuild) => {
	bot.events.get("guildUpdate").execute(bot, oldGuild, newGuild);
})

// login to Discord with bot token
if (Config.devmode)
	bot.login(process.env.KIWIDEVTOKEN);
else
	bot.login(process.env.KIWITOKEN);