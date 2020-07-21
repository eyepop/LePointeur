const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
client.channels.cache.find(channel => channel.name === 'la-salle-des-points').send("ok ok ");
