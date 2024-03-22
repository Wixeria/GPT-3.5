const wixdb = require("croxydb");

module.exports = {
    name: "reset-settings",
    description: "Reset channel for ChatGPT.",
    options: [],
    type: 1,

    run: async (client, interaction) => {
        const guildId = interaction.guild.id;
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

        return interaction.reply("ChatGPT's channel has been reset succesfully.");
    }
};