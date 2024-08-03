const wixdb = require("croxydb");
const Discord = require('discord.js');

module.exports = {
    name: "reset-channel",
    description: "Reset channel for ChatGPT.",
    options: [],
    type: 1,

    run: async (client, interaction) => {
        const guildId = interaction.guild.id;
        const data = wixdb.get(`chatgpt_${guildId}`);

        if (!data) {
            const fail = new Discord.EmbedBuilder()
          .setColor("Red")
          .setDescription("How can i register channel for ChatGPT?")
          .setTitle("<:warn:1269325193243787304> Chat channel data is not registered.")
          .addFields(
            { name: '<:set:1269325008165929054> Setting channel', value: '<:slash:1269325012645445652> Use /set-channel command', inline: true },
            { name: '<:reset:1269325010019815555> Reset channel', value: '<:slash:1269325012645445652> Use /reset-channel command for reset.', inline: true },
                    )
          .setTimestamp()

          return interaction.reply({ embeds: [fail], ephemeral: true }).catch((e) => { })
        }

        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
            return interaction.reply("You must be an administrator to use this command.");
        }

        let allKeys = wixdb.all();

        // Check if allKeys is an object, convert it to an array if needed
        if (allKeys && typeof allKeys === "object") {
            allKeys = Object.keys(allKeys);
        }

        allKeys.forEach(key => {
            if (key.includes(guildId)) {
                wixdb.delete(key);
            }
        });

        const succes = new Discord.EmbedBuilder()
        .setColor("Green")
        .setTitle("<:apply:1269324411799076986> | Channel reset succesfully")
        return interaction.reply({ embeds: [succes], ephemeral: true }).catch((e) => { })
    }
};