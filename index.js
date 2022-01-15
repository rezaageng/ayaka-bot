const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
})

let bot = {
    client,
    prefix: "ay.",
    owners: "465403883469012992",
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadEvents(bot, false)

module.exports = bot

client.login(process.env.TOKEN)
