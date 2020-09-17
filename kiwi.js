// invite link: https://discordapp.com/oauth2/authorize?&bot_id=733764727053746187&scope=bot&permissions=8
// developer portal: https://discord.com/developers/applications
// discord.js API: https://discordjs.guide/
// launch command: nodemon --inspect ballotbot.js

// created by Adam Elaoud (Sap#5703)
// copyright (c) 2020

// require discord.js module
const Discord = require("discord.js");
// require Javascript File System
const FS = require("fs");
// require dotenv-flow to load environment variables
require("dotenv-flow").config();
// require data.js module
const Data = require("./utilities/data.js");

// create new bot
const bot = new Discord.Client();
// create collection of bot commands / events 
bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();

// fill command collection
const commandFiles = FS.readdirSync("./commands");
for (const file of commandFiles) {
	let command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

// fill event collection
const eventFiles = FS.readdirSync("./events");
for (const file of eventFiles) {
	let event = require(`./events/${file}`);
	bot.events.set(event.name, event);
}

bot.on("ready", () => {
	bot.user.setActivity(`🐸 Use ${Data.prefix}help`);
	console.log(`Logged in as ${bot.user.tag}!`);
	
	// send launch notification
	const owner = bot.users.fetch(Data.ownerId).then(
		function(user) {
			let date = new Date();
			user.send("Bot Online! **" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "**");
		}
	).catch(err => {console.log("Error sending message! Error: ", err.message)});
});

bot.on("message", message => {
	// if another bot sent the message, if it has attachments, or if the prefix wasn't used, do nothing
	if (message.author.bot || message.attachments.size !== 0 || (!message.content.startsWith(Data.prefix) && !message.content.startsWith(Data.altPrefix)))
		return;

	if (Data.devmode && message.author.id !== Data.ownerId) {
		return;
	}

	// parsing command and arguments beginning after the prefix
	let args = message.content.substring(Data.prefix.length).split(/[\s|\r?\n|\r]/);
	// remove any remaining empty space
	args = args.filter(ele => ele !== "" && ele !== " ");
	// retrieve command
	command = args.shift();

	// checking command request
	switch(command) {
		case "ping":
			bot.commands.get("ping").execute(bot, message);
			break;
		case "servers":
			bot.commands.get("servers").execute(bot, message);
			break;
		case "cmds":
			// bot.commands.get("cmds").execute(bot, message);
			break;
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
		case "ick":
			// do nothing (ignores MEE6 kick command)
			break;
		default:
			bot.commands.get("unrecognized").execute(bot, message, command);
	}
});

bot.on("guildCreate", server => {
	bot.events.get("guildCreate").execute(bot, server);
});

bot.on("guildDelete", server => {
	bot.events.get("guildDelete").execute(bot, server);
});

// login to Discord with bot token
if (Data.devmode)
	bot.login(process.env.KIWIDEVTOKEN);
else
	bot.login(process.env.KIWITOKEN);