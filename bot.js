const Discord = require("discord.js");
const client = new Discord.Client();

console.log(client.channels.cache.get(0));
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
