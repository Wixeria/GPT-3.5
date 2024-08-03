const Discord = require("discord.js");
const wixdb = require("croxydb");
const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { OpenAI } = require("openai");

module.exports = {
  name: "ask",
  description: "Ask ChatGPT a question!",
  type: 1,
  options: [
    {
      name: "question",
      description: "What would you like to ask ChatGPT?",
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const question = interaction.options.getString("question");

    let data = wixdb.get(`chatgpt_${interaction.guild.id}`);
    if (!data) {
      return interaction.reply({
        content:
          "Can't find channel for ChatGPT. Did you set channel for ChatGPT?",
        ephemeral: true,
      });
    }

    await interaction.reply({ content: "Thinking..." });

    const openai = new OpenAI({
      apiKey: process.env.API_KEY,
    });

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful and friendly AI assistant." },
          { role: "user", content: question },
        ],
      });

      const answer = response.choices[0].message.content;

      // Check if the output is too long
      if (answer.length > 2000) {
        // Convert to a buffer
        const buffer = Buffer.from(answer, "utf-8");
        // Send the buffer as a file
        await interaction.editReply({
          files: [
            {
              attachment: buffer, // use 'attachment' instead of 'data'
              name: "answer.txt"
            }
          ]
        });
      } else {
        // Send the answer as a message
        await interaction.editReply({ content: answer });
      }
    } catch (error) {
      console.error("OpenAI Error:\n", error);
      await interaction.editReply({ content: "Something went wrong. Please try again later." });
    }
  },
};