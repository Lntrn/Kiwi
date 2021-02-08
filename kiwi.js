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
// require format.js module
const Format = require("./utilities/format.js");
// require Blacklist module
const Blacklist = require("./utilities/blacklist.js");


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

// variables for status loop
let activity = "users";
let memberCount;
let iterations = 0;

bot.on("ready", async () => {
	console.log(`Logged in as ${bot.user.tag}!`);

	// initializing  member count
	memberCount = Format.memberCount(bot);
	// start status loop
	statusLoop();

	try {
		// load blacklists
		const success = await Blacklist.load(true, true);

		const owner = await bot.users.fetch(Config.ownerID);

		// send launch notification
		let date = new Date();
		let status = `**Blacklist loaded:** ${success}`
					+ `\n**Status Loop Started:** true`
					+ `\n**Time:** ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

		owner.send(status);

		// initialize owner profile image
		Format.footer.image = owner.avatarURL();

	} catch (err) {
		console.log("Error sending message! Error: ", err.message);
	}
});

bot.on("message", async (message) => {
	// if in devmode, only respond to dev
	// if (Config.devmode && message.author.id !== Config.ownerID)
	// 	return;

	// if a bot sent the message or if it has attachments, ignore
	if (message.author.bot || message.attachments.size !== 0)
		return;

	const users = Blacklist["users"];
	const servers = Blacklist["servers"];

	console.log(users);
	console.log(servers);

	// if user/server is blacklisted, provide blacklist repsonse
	const user = users.find((user) => user._user === message.author.id);
	const server = servers.find((server) => server._server === message.guild.id);

	if (user) {
		const log = user._log;
		return Blacklist.userBlacklisted(bot, message, log[log.length - 1].reason);

	} else if (server) {
		const log = server._log;
		return Blacklist.serverBlacklisted(bot, message, log[log.length - 1].reason);
	}

	const prefix = await Config.prefix(bot, message); // promise rejection handled internally
	const prefixCheck = message.content.substr(0, prefix.length);
	const universalPrefixV1Check = message.content.substr(0, Config.universalPrefix.v1.length);
	const universalPrefixV2Check = message.content.substr(0, Config.universalPrefix.v2.length);

	// parse command and arguments beginning after the prefix
	let args;

	// if server prefix was used
	if (prefixCheck.toLowerCase() === prefix.toLowerCase()) {
		args = message.content.substring(prefix.length).split(/[\s|\r?\n|\r]/);

	// if universal perfix V1 was used
	} else if (universalPrefixV1Check === Config.universalPrefix.v1) {
		args = message.content.substring(Config.universalPrefix.v1.length).split(/[\s|\r?\n|\r]/);

	// if universal perfix V2 was used
	} else if (universalPrefixV2Check === Config.universalPrefix.v2) {
		args = message.content.substring(Config.universalPrefix.v2.length).split(/[\s|\r?\n|\r]/);

	// if no prefixes match
	} else {
		return;
	}

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
		case "portrait":
			if (message.author.id === Config.ownerID)
				bot.devCommands.get("portrait").execute(bot, message);
			break;
		case "banUser":
			if (message.author.id === Config.ownerID)
				bot.devCommands.get("banUser").execute(bot, message, args);
			break;
		case "banServer":
			if (message.author.id === Config.ownerID)
				bot.devCommands.get("banServer").execute(bot, message, args);
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


// status loop
function statusLoop() {
	setInterval(
		function() {
			switch (activity) {
				case "help":
					bot.user.setActivity(`${Config.defaultPrefix} help`, { type: "LISTENING" });
					activity = "servers";
					break;
				case "users":
					// only update user count every 60 min (40 iterations * 90 sec apart = 3600 secs = 1 hour)
					if (iterations === 40) {
						memberCount = Format.memberCount(bot);
						iterations = 0;
					} else {
						iterations++;
					}
					
					bot.user.setActivity(`over ${memberCount.toLocaleString()} users`, { type: "WATCHING" });
					activity = "help";
					break;
				case "servers":
					bot.user.setActivity(`over ${bot.guilds.cache.size.toLocaleString()} servers`, { type: "WATCHING" });
					activity = "users";
					break;
			}
		},
		30000
	);
}