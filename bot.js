const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
	client.channels.cache.forEach(logMapElements);
	const chanPoints=client.channels.cache.get("735193960783413351");
	const chanGen=client.channels.cache.get("690970175956189209");


	chanPoints.send("okok");
	wipeChan(chanPoints);
});
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

function initPoints(id,nb,chan){
	chan.send(id+"¤"+nb+"¤");
}

function wipeChan(chan){
	chan.messages.fetch()
  .then(messages => {
    messages.forEach(msg => msg.delete());
  });

}

function logMapElements(value, key, map) {
	console.log('m['+key+'] = '+value);
}
