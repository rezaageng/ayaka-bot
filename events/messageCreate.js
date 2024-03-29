const channelId = "942685295944532028"

module.exports = {
  name: "messageCreate",
  run: async (bot, message) => {
    const { client, prefix, owners } = bot

    if (!message.guild)
      return client.channels.cache.get(channelId).send({
        content: `${message.author.tag}: ${message.content}`,
        files: [...message.attachments.values()],
      })

    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return

    console.log(message)

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmdstr = args.shift().toLowerCase()

    let command = client.commands.get(cmdstr)
    if (!command) return

    let member = message.member

    if (command.devOnly && !owners.includes(member.id)) {
      return message.reply(
        "This command is only available to the bot developers"
      )
    }

    if (
      command.permission &&
      member.permissions.missing(command.permissions) !== 0
    ) {
      return message.reply("You do not have permission to use this command")
    }

    try {
      await command.run({ ...bot, message, args })
    } catch (err) {
      let errMsg = err.toString()

      if (errMsg.startsWith("?")) {
        errMsg = errMsg.slice(1)
        await message.reply(errMsg)
      } else {
        console.error(err)
      }
    }
  },
}
