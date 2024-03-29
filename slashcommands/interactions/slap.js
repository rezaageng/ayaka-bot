const { MessageAttachment } = require("discord.js")
const { getWaifu } = require("../../util/apiRequest")

module.exports = {
  name: "slap",
  description: "Slap someone",
  category: "interactions",
  permissions: [],
  devOnly: false,
  options: [
    {
      name: "member",
      description: "The person you want to slap",
      type: "USER",
      required: true,
    },
  ],
  run: async ({ client, interaction }) => {
    const member = interaction.options.getMember("member")
    const gif = await getWaifu("slap")

    const attachment = new MessageAttachment(gif, "slap.gif")
    await interaction.deferReply()
    return await interaction.followUp({
      content: `Slap <@${member.id}>`,
      files: [attachment],
    })
  },
}
