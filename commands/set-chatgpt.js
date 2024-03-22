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

        const permission = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription("You need to have `ManageChannels` permission to use this command.")

        const chatchannel = interaction.options.getChannel('channel')
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [permission], ephemeral: true })

        const basarili = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`Chat channel has been set succesfully.\n\nChannel: ${chatchannel}`)

        wixdb.set(`chatgpt_${interaction.guild.id}`, { channel: chatchannel.id })
        return interaction.reply({ embeds: [basarili], ephemeral: true }).catch((e) => { })

    }

};