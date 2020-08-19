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
const Data = require("./data.js");

// create new bot
const bot = new Discord.Client();
// create collection of bot commands
bot.commands = new Discord.Collection();
// development toggle
let devmode = false;

// fill command collection
const commandFiles = FS.readdirSync("./commands");
for (const file of commandFiles) {
	let command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
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
	if (message.author.bot || message.attachments.size !== 0 || !message.content.startsWith(Data.prefix))
		return;

	if (devmode && message.author.id !== Data.ownerId) {
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
		case "info":
			bot.commands.get("info").execute(bot, message);
			break;
		case "cmds":
			bot.commands.get("cmds").execute(bot, message);
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
		case "suggestion":
			bot.commands.get("suggestion").execute(bot, message, args);
			break;
		default:
			bot.commands.get("unrecognized").execute(bot, message, command);
	}
});

// login to Discord with bot token
if (devmode)
	bot.login(process.env.KIWIDEVTOKEN);
else
	bot.login(process.env.KIWITOKEN);