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
       
      if (!data) {
          return interaction.reply(`Channel is already set. ${chatchannel}`);
      }

        const chatchannel = interaction.options.getChannel('channel')
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [permission], ephemeral: true })

        const succes = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`Chat channel has been set succesfully.\n\nChannel: ${chatchannel}`)

        wixdb.set(`chatgpt_${interaction.guild.id}`, { channel: chatchannel.id })
        return interaction.reply({ embeds: [succes], ephemeral: true }).catch((e) => { })

    }

};
