const Discord = require("discord.js");
const client = new Discord.Client();

client.channels.get("la-salle-des-points").send("turlututu");


client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
