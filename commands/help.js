const Discord = require("discord.js");
const wixdb = require("croxydb");
const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
module.exports = {
  name: "help",
  description: "Show bot commands and explain it.",
  type: 1,
  options: [],
  run: async (client, interaction) => {
    const help = new Discord.EmbedBuilder()
      .setColor("Green")
      .setTitle("Commands")
      .setThumbnail('https://i.imgur.com/SVbIy9O.png')
      .setDescription("<:slash:1269340398535577641> Here are the available commands:")
      .addFields({ name: '/ask', value: '<:welcome:1269340124416577559> Ask ChatGPT a question!' },
                 { name: '/ping', value: '<:clock:1269339164567146561> Show bot ping.' },
                 { name: '/reset-channel', value: '<:reset:1269325010019815555> Reset channel for ChatGPT.' },
                 { name: '/set-channel', value: '<:set:1269325008165929054> Set ChatGPT channel where to chat with OpenAI.' },
                 { name: '/info', value: '<:link:1269339625336602738> Show bot information.' }
                )
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()});

    let data = wixdb.get(`chatgpt_${interaction.guild.id}`);
    if (!data) {
      return interaction.reply({
        content:
          "Can't find channel for ChatGPT. Did you set channel for ChatGPT?",
        ephemeral: true,
      });
    }
    return interaction.reply({ embeds: [help] });
  }
};