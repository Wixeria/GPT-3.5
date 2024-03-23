const wixdb = require("croxydb");
const Discord = require('discord.js');

module.exports = {
    name: "reset-settings",
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
          .setTitle("<:ur_emoji_name_here:1234567890> Chat channel data is not registered.")
          .addFields(
            { name: '<ur_emoji_name_here:1234567890> Setting channel', value: '<:botbadge:1220484006462750820> Use /set-chatgpt command', inline: true },
            { name: '<:ur_emoji_name_here:1234567890> Reset channel', value: '<:botbadge:1220484006462750820> Use /reset-settings command for reset.', inline: true },
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
        .setTitle("<:ur_emoji_name_here:1234567890> | Settings reset succesfully")
        return interaction.reply({ embeds: [succes], ephemeral: true }).catch((e) => { })
    }
};
