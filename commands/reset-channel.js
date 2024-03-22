const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const wixdb = require("croxydb")
const Discord = require("discord.js")
module.exports = {
    name: "reset-settings",
    description: "Reset ChatGPT's channel.",
    type: 1,
    options: [],
  
    run: async (client, interaction) => {

        const permission = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription("You need to have `ManageChannels` permission to use this command.")

        const chatchannel = interaction.options.getChannel('channel')
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [permission], ephemeral: true })

        const basarili = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`Chat channel has been reset succesfully.`)

        wixdb.delete(`chatgpt_${interaction.guild.id}`)
        return interaction.reply({ embeds: [basarili], ephemeral: true }).catch((e) => { })

    }

};
