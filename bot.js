const Discord = require("discord.js");
const client = new Discord.Client();

const channel = client.channels.find('la-salle-des-points', channelName);
channel.send("turlututu");

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
