var pool = require ('./clientpool.js');

const Discord = require('discord.js');

const client = new Discord.Client();

prefix = '!'
 

client.on('ready', () => {

    console.log('I am ready!');
    pool.connect( (err, client, done) => {
            client.query('create table if not exists users( \
                id text primary key, \
                name text, \
		points double, \
		triangle integer, \
                count integer default 0)', (err, result) => {
                    //disconnent from database on error
                    done(err);
            });
    });
});

 

client.on('message', message => {

    //Not send by a bot and not a command
    if(!message.author.bot && !(message.content.startsWith(prefix)) ){
        //Connected to database
        pool.connect( (err, client, done) => {
            //Increment users count by 1
            client.query('update users set count = count + 1 where id = $1',
            [message.author.id], (err, result) => {

                done(err);
                //If user not in the database add them
                if (result.rowCount == 0){
                    client.query('insert into users (id, name, count) values ($1, $2, 1)',
                    [message.author.id, message.author.username], (err, result) => {
                        done(err);
                        console.log(result.rowCount);
                    });
                }
            });
        });
    }else{
	if(message.content.startsWith(prefix+" donne ")){
		var msg = message.content.split(" ");
		console.log("bababa");
const channel = client.channels.cache.get('<id>');
		channel.send(msg[msg.length-1]);
	}
		
	}
});

client.on('guildMemberUpdate', (oldguy, newguy) => {
    pool.connect( (err, client, done) => {
        //Update display name to new nickname
        client.query('update users set name = $1 where id = $2',
        [newguy.displayName, newguy.user.id], (err, result) => {
            done(err);
		console.log("ahah");
        });
    });

});


 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret