const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
	//client.channels.cache.forEach(logMapElements);
	const chanPoints=client.channels.cache.get("735193960783413351");
	const chanGen=client.channels.cache.get("690970175956189209");

	//wipeChan(chanPoints);
	chanGen.members.forEach(member => initPoints(member.user.bot,member.id,member.user.username,0,chanPoints));
});

client.on('message', msg => {
	var dest="";
	if (msg.startsWith('!donne ')) {
		var m=msg.split(" ");
		for(var i=0;i<m.length;i++){
			if(m[i]==="à"||m[i]==="a"){
				if(i+1<m.length){
					dest=m[i+1];
				}
			}
		}
	}
});


client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

function initPoints(bot,id,username,nb,chan){
	if(!bot && userInChan(id,chan)){
		chan.send("{ id : "+id+"; username : "+username+" ; points :"+nb+"}");
	}
}

function userInChan(id,chan){
	chan.messages.fetch()
		.then(messages => {
			messages.forEach(msg => return (parseMsg(msg).id===id));
		});
}


function parseMsg(msg){

	return JSON.parse(msg);
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
