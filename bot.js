const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

const channel = client.channels.cache.get('735193960783413351');
channel.send('<content>');
