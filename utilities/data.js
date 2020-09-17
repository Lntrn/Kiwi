// file containing ubiquitous data for Kiwi
module.exports = {
    emojis: {
        spiralscholars: "<:spiralscholars:754405854278844498>",
        wizpetmasters: "<:wizpetmasters:752955530061938808>",
        kiwi: "<:Kiwi:745331041157513346>",
        round: "<:rounding:747128573814505754>",
        fake: "❗",
        str: "<:strength:744863432456667200>",
        int: "<:intellect:744863431210827856>",
        agil: "<:agility:744863430984597524>",
        will: "<:will:744863432838348812>",
        power: "<:power:744863431445839962>",
        happy: "<:wizhappiness:744932664158584914>",
        dmg: "<:damage:744863431060094997>",
        res: "<:resist:744863432880160798>",
        acc: "<:accuracy:744864658137153536>",
        pierce: "<:pierce:744863430950781020>",
        crit: "<:crit:744863431080935474>",
        block: "<:block:744863431047249920>",
        pip: "<:pip:744863431105970187>",
        pcon: "<:pipconvert:744864962177925191>",
        inc: "<:incoming:744867912829108294>",
        out: "<:outgoing:744867912736833586>",
        health: "<:health:744865504744833035>",
        mana: "<:mana:744865504962805820>",
        luck: "<:fishluck:744863431122878536>",
        stunres: "<:stunresist:744865231624470538>",
        heart: "<:healing:744863431068221521>",
        storm: "<:storm:744971321984679947>",
        fire: "<:fire:744971321548603453>",
        ice: "<:ice:744971321565511880>",
        balance: "<:balance:744971321561317466>",
        life: "<:life:744971321343213599>",
        myth: "<:myth:744971321586221227>",
        death: "<:death:744971321229836318>"
    },
    emojiIds: {
        spiralscholars: "754405854278844498",
        wizpetmasters: "752955530061938808",
        kiwi: "745331041157513346",
        round: "747128573814505754",
        str: "744863432456667200",
        int: "744863431210827856",
        agil: "744863430984597524",
        will: "744863432838348812",
        power: "744863431445839962",
        happy: "744932664158584914",
        dmg: "744863431060094997",
        res: "744863432880160798",
        acc: "744864658137153536",
        pierce: "744863430950781020",
        crit: "744863431080935474",
        block: "744863431047249920",
        pip: "744863431105970187",
        pcon: "744864962177925191",
        inc: "744867912829108294",
        out: "744867912736833586",
        health: "744865504744833035",
        mana: "744865504962805820",
        luck: "744863431122878536",
        stunres: "744865231624470538",
        heart: "744863431068221521",
        storm: "744971321984679947",
        fire: "744971321548603453",
        ice: "744971321565511880",
        balance: "744971321561317466",
        life: "744971321343213599",
        myth: "744971321586221227",
        death: "744971321229836318"
    },
    footer: {
        text: "© Sap#5703",
        image: "https://i.imgur.com/wbFToRX.png"
    },
    server: {
        text: "Join Us!",
        link: "https://discord.gg/xY9VkHq"
    },
    bot: {
        text: "Invite Kiwi!",
        invite: "https://discord.com/api/oauth2/authorize?client_id=743944201682681937&permissions=8&scope=bot"
    },
    prefix: "!k",
    altPrefix: "k!", // both prefixes must be the same length
    bugReportId: "744862627188179005",
    suggestionId: "745083262476484668",
    cmdUsageId: "745691111523352653",
    cmdLog: "746087206514327592",
    devCmds: "745373245213114438",
    errorLog: "756179150796226561",
    supportLink: "https://discord.gg/sFMwKCy",
    devReportRole: "<@&744861411628417034>",
    ownerMention: "<@193427298958049280>",
    ownerId: "193427298958049280",
    devmode: true,
    update: false,
    testingId: "727858983146356777",
    emptyChar: " ‎",
    space(amt) {
        let whitespace = "";

        let i;
        for (i = 0; i < amt; i++) {
            whitespace += "\u00A0";
        }

        return whitespace;
    }
}