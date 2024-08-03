const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const wixdb = require("croxydb")
const Discord = require("discord.js")

module.exports = {
    name: "set-channel",
    description: "Set ChatGPT channel where to chat with OpenAI.",
    type: 1,
    options: [
        {
            name: "channel",
            description: "Set ChatGPT channel where to chat with OpenAI.",
            type: 7,
            required: true,
            channel_types: [0]
        }
    ],
    run: async (client, interaction) => {
      const guildId = interaction.guild.id;
      const data = wixdb.get(`chatgpt_${guildId}`);

        const permission = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription("You need to have `ManageChannels` permission to use this command.")

      if (data) {
        const fail = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription("How can I delete my registered channel for ChatGPT?")
        .setTitle("<:warn:1269325193243787304> Chat channel data is already registered.")
        .addFields(
          { name: '<:reset:1269325010019815555> Reset channel', value: '<:slash:1269325012645445652> Use /reset-channel command for reset.', inline: true },
          { name: '<:set:1269325008165929054> Setting channel', value: '<:slash:1269325012645445652> Use /set-channel command', inline: true },
                  )
        .setTimestamp()

        return interaction.reply({ embeds: [fail], ephemeral: true }).catch((e) => { })
        }

        const chatchannel = interaction.options.getChannel('channel')
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [permission], ephemeral: true })

        const succes = new EmbedBuilder()
            .setColor("Green")
            .setTitle(`<:apply:1269324411799076986> | Chat channel has been set succesfully.\n\n<:channel:1269327417999360031> | Channel: ${chatchannel}`)

        wixdb.set(`chatgpt_${interaction.guild.id}`, { channel: chatchannel.id })
        return interaction.reply({ embeds: [succes], ephemeral: true }).catch((e) => { })

    }

};