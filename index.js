const Discord = require("discord.js")
const { Player } = require("discord-player")
const playdl = require("play-dl")
const { DiscordTogether } = require("discord-together")
require("dotenv").config()

const client = new Discord.Client({
  partials: ["CHANNEL"],
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS",
    "GUILD_VOICE_STATES",
    "DIRECT_MESSAGES",
  ],
})

let bot = {
  client,
  prefix: "ay.",
  owners: "465403883469012992",
}

client.player = new Player(client)
client.playdl = playdl
client.discordTogether = new DiscordTogether(client)

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()
client.buttons = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) =>
  require("./handlers/commands")(bot, reload)
client.loadSlashCommands = (bot, reload) =>
  require("./handlers/slashcommands")(bot, reload)
client.loadButtons = (bot, reload) => require("./handlers/buttons")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)
client.loadButtons(bot, false)

module.exports = bot

client.login(process.env.TOKEN)
