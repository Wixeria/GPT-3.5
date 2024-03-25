const { Client, EmbedBuilder } = require("discord.js");
const wixdb = require("croxydb");
module.exports = {
  name: "ping",
  description: "Show bot ping.",
  type: 1,
  options: [],
  run: async (client, interaction) => {
    let data = wixdb.get(`chatgpt_${interaction.guild.id}`);
    if (!data) {
      return interaction.reply({
        content:
          "Can't find channel for ChatGPT. Did you set channel for ChatGPT?",
        ephemeral: true,
      });
    }

    interaction.reply({
      embeds: [
        {
          image: {
            url:
              "https://dummyimage.com/2000x500/33363c/ffffff&text=" +
              client.ws.ping +
              "%20MS",
          },
        },
      ],
    });
  },
};
