const Discord = require("discord.js");
const client = new Discord.Client();
client.on('ready', () => {
	//client.channels.cache.forEach(logMapElements);
	const chanPoints=client.channels.cache.get("735193960783413351");
	const chanGen=client.channels.cache.get("690970175956189209");
	const chanTest=client.channels.cache.get("692075989026734090");
	//wipeChan(chanPoints);
	try{
		console.log(chan.messages.fetch({ limit: 1 }).then(message => {
			console.log(message.get(chan.lastMessageID).content);
		}));
	}catch(error){

	}

	if(countMessages(chanPoints)==0){
		chanGen.members.forEach(member => initPoints(member.user.bot,member.id,member.user.username,0,chanPoints));
	}
});

client.on('message', msg => {
	var dest="";
	var nb=0.0;
	const chanPoints=client.channels.cache.get("735193960783413351");
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
		var id=dest.replace("<","").replace(">","").replace("@","").replace("!","");
		msg.reply(nb+"->"+dest.replace("<","").replace(">","").replace("@","").replace("!",""));
		addPoints(msg.author.bot,id,client.user.fetch(id).username,nb,chanPoints);
	}
});


function addPoints(bot,id,username,nb,chan){
	if(!bot){

		const jsonForm='{"id" : "'+id+'", "username" : "'+username+'" , "scores":{"points" :'+nb+'}}';
		chan.messages.fetch().then(msgs => { // Get messages to check
			var msgEdit = msgs.filter(msgss => msgss.content.contains('"id" : "'+id+'"')) // Finds all messages with 'check'
			parseMsg(msgEdit).scores.points+=nb;
			if(msgEdit!=null){

				msgEdit.edit(jsonForm);
			}
			console.log(jsonForm);
		});	
	}
}

function initPoints(bot,id,username,nb,chan){
	if(!bot && !userInChan(id,chan)){
		const jsonForm='{"id" : "'+id+'", "username" : "'+username+'" , "scores":{"points" :'+nb+'}}';
		chan.send(jsonForm);
	}
}

function countMessages(chan){

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
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
