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
                count integer default 0)', (err, result) => {
                    //disconnent from database on error
                    done(err);
            });
    });
});

 

client.on('message', message => {

    //Not send by a bot and not a command
    if(message.author.bot == false && (message.content.startsWith(prefix) == false) ){
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
    }
});



 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret