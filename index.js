require('dotenv/config');
const { Client } = require('discord.js');
const { OpenAI } = require('openai');
const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});

const IGNORE_PREFIX = "!";

const wixdb = require("croxydb")

global.client = client;
client.commands = (global.commands = []);
const { readdirSync } = require("fs")
const { setTimeout } = require("timers");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: true,
        type: 1
    });

    console.log(`[COMMAND] ${props.name} command loaded.`)

});
readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(`[EVENT] ${name} event loaded.`)
});

client.login(process.env.TOKEN)
