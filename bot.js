const Discord = require("discord.js");
const client = new Discord.Client();

client.channels.cache.forEach(logMapElements);
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

function logMapElements(value, key, map) {
  console.log(`m[${key}] = ${value}`);
}
