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

    if (message.content === prefix) {

       message.reply('pong');

       }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret