
const commando = require('discord.js-commando');
var pool = require ('./clientpool.js');

prefix = '!'

//Connect to discord server
const bot = new commando.Client({
    commandPrefix: prefix,
    owner:['Robière#7240']
});


bot.login(process.env.BOT_TOKEN);



//Bot loads up
bot.on('ready', () => {
    console.log('The bot is ready to go');
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

