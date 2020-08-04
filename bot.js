const Discord = require("discord.js");
const client = new Discord.Client();
client.on('ready', () => {
	//client.channels.cache.forEach(logMapElements);
	const chanPoints=client.channels.cache.get("735193960783413351");
	const chanGen=client.channels.cache.get("690970175956189209");
	const chanTest=client.channels.cache.get("692075989026734090");
	//wipeChan(chanPoints);
	console.log("C'est parti !!!");
	chanPoints.messages.fetch({ limit: 1 }).then(message => {
		console.log(message.get(chanPoints.lastMessageID).content);
	}).catch(error =>{
		console.log(error);
		chanGen.members.forEach(member => initPoints(member.user.bot,member.id,member.user.username,0,chanPoints));
	});
	console.log("okay ?");

});

var nb=0.0;
var dest="";

function triangleChecker(content){
	const verbes=["chaparde","barbote","déleste","dépossède","soutire","fauche","dépouille","confisque","chipe","dérobe","vole","prend","pique"];
	for(var i=0;i<verbes.length;i++){
		if(content.includes(verbes[i]) && content.includes("triangle")){
			return true;
		}
	}
	return false;
}
client.on('message', async msg => {

	const chanPoints=client.channels.cache.get("735193960783413351");
	if(msg.author.id === "231883809052688395"|| msg.author.id === "17 2348173166051328"){
		if(triangleChecker(msg.content)){
			msg.reply("tu as commis un crime ! Tu dois répondre de tes actes auprès du grand conseil des Triangles ...");
		}
	}
	if (msg.content.startsWith('!snap ')) {
		var halfIDs=[];
		await selectRandomHalf(msg.channel,halfIDs);
		console.log(halfIDs.length);
	}
	if (msg.content.startsWith('!clear ')) {
		var args=msg.content.split(" ");
		if(args.length>1){
			msg.reply(clear(args[1],msg.channel));
		}
	}

	if (msg.content.startsWith('!score ')) {

		var m=msg.content.split(" ");
		if(m.length>1){
			console.log(m[1]);
			if(m[1].startsWith("<@!")){
				var id=m[1].replace("<","").replace(">","").replace("@","").replace("!","");	
				getPoints(chanPoints,id,msg);			
			}
		}
	}
	let allowedRole = msg.guild.roles.cache.find(r => r.name === "License To Point");

	if (msg.content.startsWith('!donne ')) {
		if(msg.member.roles.cache.has(allowedRole.id)){
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
			//msg.reply(nb+"->"+dest.replace("<","").replace(">","").replace("@","").replace("!",""));
			var usr=client.users.cache.get(id);
			if (usr!=undefined){
				console.log(usr.username);
				addPoints(msg.author.bot,id,usr.username,nb,chanPoints);
				reply(msg,""+nb+" points pour "+usr.username);
				//getPoints(chanPoints,id,msg);
			}
		}else{
			msg.reply("ah bah non en fait ...");
		}
	} 
});

function reply(msg,str){
	msg.channel.send(str);
}

async function clear(id,channel) {
	var message=channel.messages.fetch(id)
		.then(async msg=>{
			await msg.delete();
		});
	return("suppression ?");
}

async function selectRandomHalf(channel,halfIDs){
	console.log(channel);
	await channel.messages.fetch().then(async msg =>{
		if(getRandomInt(2)==0){
			await console.log(msg.id+" : "+msg.content);
			await halfIDs.push(msg.id);
		};
	});	
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
function getPoints(chan,id,msg){
	var msgEdit;
	chan.messages.fetch().then(messages => {
		messages.forEach(function(message){
			if(message.content.includes('{"id" : "'+id+'",')){
				reply(parseMsg(message).username+" : "+parseMsg(message).scores['points']+" pts");
			}
		}
		);
	});

}
function addPoints(bot,id,username,nb,chan){
	var d=nb;
	var usernm=username;
	if(!bot){

		var msgEdit;
		chan.messages.fetch().then(messages => {
			messages.forEach(function(message){ 
				if(message.content.includes('{"id" : "'+id+'",')){
					console.log("nb "+d);
					d =parseFloat(d)+parseFloat(parseMsg(message.content).scores.points);
					console.log("points "+parseMsg(message.content).scores['points']);
					const jsonForm='{"id" : "'+id+'", "username" : "'+usernm+'" , "scores":{"points" :'+d+'}}';
					console.log(message.content);
					message.edit(jsonForm).then(console.log(message.content));
				}
			});
		}).catch(error =>{
			console.log(error);
		});


	}
}

function initPoints(bot,id,username,nb,chan){
	if(!bot && !userInChan(id,chan)){
		const jsonForm='{"id" : "'+id+'", "username" : "'+username+'" , "scores":{"points" :'+nb+',"triangle":1}}';
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
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
