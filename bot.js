const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
	//client.channels.cache.forEach(logMapElements);
	const chanPoints=client.channels.cache.get("735193960783413351");
	const chanGen=client.channels.cache.get("690970175956189209");

	//wipeChan(chanPoints);
	chanGen.members.forEach(member => initPoints(member.user.bot,member.id,member.user.username,0,chanPoints));
});
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

function initPoints(bot,id,username,nb,chan){
	if(!bot){
		chan.send("{ id : "+id+"; username : "+username+" ; points :"+nb+"}");
	}
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
