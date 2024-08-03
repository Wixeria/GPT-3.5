const Discord = require("discord.js");
const wixdb = require("croxydb");
const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
module.exports = {
  name: "info",
  description: "Show bot information.",
  type: 1,
  options: [],
  run: async (client, interaction) => {
    const info = new Discord.EmbedBuilder()
      .setColor("Blue")
      .setTitle("About GPT 3.5")
      .setDescription(
        "GPT 3.5 is a powerful language model developed by OpenAI. It is capable of generating human-like text.",
      )
      .setFooter({ text: "Made by Wixeria" })
      .setThumbnail("https://i.imgur.com/SVbIy9O.png");

    let data = wixdb.get(`chatgpt_${interaction.guild.id}`);
    if (!data) {
      return interaction.reply({
        content:
          "Can't find channel for ChatGPT. Did you set channel for ChatGPT?",
        ephemeral: true,
      });
    }

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Add to Your Server")
        .setStyle(ButtonStyle.Link)
        .setURL("https://discord.com/oauth2/authorize?client_id=1214940909834338345&permissions=18432&integration_type=0&scope=bot+applications.commands")
        .setEmoji("1269323455723995167"),
    );

    return interaction.reply({ embeds: [info], components: [button] });
  },
};