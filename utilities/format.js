module.exports = {
    footer: {
        text: "© Sap#5703",
        image: "https://i.imgur.com/c5AskA7.png" // eventually update owner image to modular User.avatarURL()
    },
    server: {
        text: "Join Us!",
        link: "https://discord.gg/xY9VkHq \"Join the Spiral Scholars Discord Server!\""
    },
    bot: {
        text: "Invite Kiwi!",
        invite: "https://discord.com/api/oauth2/authorize?client_id=743944201682681937&permissions=354368&scope=bot \"Invite Link for Kiwi!\""
    },
    supportLink: "https://discord.gg/sFMwKCy \"Head to our Support Server for help!\"",
    emptyChar: " ‎",
    space(amt) {
        let whitespace = "";

        let i;
        for (i = 0; i < amt; i++) {
            whitespace += "\u00A0";
        }

        return whitespace;
    },
    memberCount(bot) {
        let count = 0;

        const servers = bot.guilds.cache.array().sort();
        servers.forEach( (server) => count += server.memberCount );
        
        return count;
    }
}