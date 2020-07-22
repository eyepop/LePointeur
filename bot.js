const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
	//client.channels.cache.forEach(logMapElements);
	const chanPoints=client.channels.cache.get("735193960783413351");
	const chanGen=client.channels.cache.get("690970175956189209");
	const chanTest=client.channels.cache.get("692075989026734090");
	wipeChan(chanPoints);
	chanGen.members.forEach(member => initPoints(member.user.bot,member.id,member.user.username,0,chanPoints));
});

client.on('message', msg => {
	var dest="";
	var nb=0.0;
	if (msg.content.startsWith('!donne ')) {
		var m=msg.content.split(" ");
		for(var i=0;i<m.length;i++){
			if(m[i]==="à"||m[i]==="a"){
				if(i+1<m.length){
					dest=m[i+1];
				}
			}
			if(m[i]==="points"||m[i]==="pts"){
				if(i-1>0){
					nb=m[i-1];
				}
			}
		}
	msg.reply(nb+"->"+dest.replace("/[<>]/gi",""));
	console.log(nb+"->"+dest.replace("/[<!>]/gi",""));
	}
});

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

function addPoints(bot,id,username,nb,chan){
	if(!bot && userInChan(id,chan)){

		const jsonForm='{"id" : "'+id+'", "username" : "'+username+'" , "scores":{"points" :'+nb+'}}';
		chan.send(jsonForm);
	}
}

function initPoints(bot,id,username,nb,chan){
	if(!bot && !userInChan(id,chan)){
		const jsonForm='{"id" : "'+id+'", "username" : "'+username+'" , "scores":{"points" :'+nb+'}}';
		chan.send(jsonForm);
	}
}

function userInChan(id,chan){
	var isUserInChan=false;
	chan.messages.fetch()
		.then(messages => {
			messages.forEach(function(msg){ 
				if(!isUserInChan){
					isUserInChan=(parseMsg(msg).id===id);
				}
			});
		});
	return isUserInChan;
}


function parseMsg(msg){

	//return JSON.parse(msg);
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
