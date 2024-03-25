const { Client } = require('discord.js');
const { OpenAI } = require('openai');
const wixdb = require("croxydb");
module.exports = {
    name: "ask",
    description: "You can ask something to ChatGPT.",
    options: [
        {
            type: 3,
            name: "ask",
            description: "Ask something to ChatGPT",
            required: true
        }
    ],
    type: 1,
    run: async (client, interaction) => {
      const openai = new OpenAI({ apiKey: process.env.API_KEY });
      let data = wixdb.get(`chatgpt_${interaction.guild.id}`);
      if (!data) {
          return interaction.reply({ content: "Can't find channel for ChatGPT. Did you set channel for ChatGPT?", ephemeral: true });
      }
      let allowedChannelId = data.channel;
      let currentChannelId = interaction.channelId;
      if (allowedChannelId !== currentChannelId) {
          let allowedChannel = client.channels.cache.get(allowedChannelId);
          return interaction.reply({ content: `Please run this command in ${allowedChannel}.`, ephemeral: true });
      }
      let channel1 = data.channel;
      let channel2 = client.channels.cache.get(channel1);
      if (!channel2) return interaction.reply({ content: `Can't find channel for ChatGPT. Did you set channel for ChatGPT?`, ephemeral: true });
      const question = interaction.options.getString("ask");
      let conversation = [];
      conversation.push({
          role: 'system',
          content: question
      });
      const response = await openai.chat.completions
          .create({
              model: 'gpt-3.5-turbo',
              messages: conversation,
          })
          .catch((error) => console.error('OpenAI Error:\n', error));

      if (!response) {
          try {
              return interaction.reply("I'm having some trouble with the OpenAI API. Try again in a moment.");
          } catch (error) {
              console.error('Error replying to interaction:', error);
          }
      }
    }
};
