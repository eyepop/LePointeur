const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
client.channels.find("name","la-salle-des-points").send("Welcome!");
