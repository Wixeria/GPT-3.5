const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const wixdb = require("croxydb")
const Discord = require("discord.js")

module.exports = {
    name: "set-chatgpt",
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
        .setDescription("How can i delete my registered channel for ChatGPT?")
        .setTitle("<:ur_emoji_name_here:1234567890> Chat channel data is already registered.")
        .addFields(
          { name: '<:ur_emoji_name_here:1234567890> Reset channel', value: '<:botbadge:1220484006462750820> Use /reset-settings command for reset.', inline: true },
          { name: '<:ur_emoji_name_here:1234567890> Setting channel', value: '<:botbadge:1220484006462750820> Use /set-chatgpt command', inline: true },
                  )
        .setTimestamp()

        return interaction.reply({ embeds: [fail], ephemeral: true }).catch((e) => { })
        }

        const chatchannel = interaction.options.getChannel('channel')
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [permission], ephemeral: true })

        const succes = new EmbedBuilder()
            .setColor("Green")
            .setTitle(`<:ur_emoji_name_here:1234567890> | Chat channel has been set succesfully.\n\n<:cs_chat:1220439964375060530> | Channel: ${chatchannel}`)

        wixdb.set(`chatgpt_${interaction.guild.id}`, { channel: chatchannel.id })
        return interaction.reply({ embeds: [succes], ephemeral: true }).catch((e) => { })

    }

};
