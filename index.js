const Discord = require('discord.js');

const mySecret = process.env['TOKEN']

const { MessageEmbed } = require('discord.js');

const client = new Discord.Client({
    intents: 32767
});
// Just gets the intents
const keepAlive = require('./server');
// Keeps the bot alive
const prefix = '-';
//Chooses the bot prefix
const fs = require('fs');
//Needed to read folders
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
//Needed to read folders



client.once('ready', () => {
    console.log(`${client.user.username} is ready!`)
});
//Once it is ready, it will log onto the console
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args, Discord);
    } else if (command == 'youtube'){
        


       // let role = message.guild.roles.cache.find(r => r.name === ".");

       // if (message.member.permissions.has("ADMINISTRATOR")){
        //    message.channel.send('You have the permission to do anything.');
        //}
    
        if(message.member.roles.cache.has('942079000208089138')){
            message.reply('Ok.');
            message.member.roles.remove('942079000208089138').catch(console.error);

        } else if(!message.member.roles.cache.has('942079000208089138')) {
            message.reply('`Error:` **(A25)** - You are **missing** the right roles to utilise this command! I see you do not, so why not let me add it for you, try running the command again in 5 seconds or less.');
            message.member.roles.add('942079000208089138').catch(console.error);
        }
    } else if(command === 'embed1') {
        client.commands.get('embed1').execute(message, args, Discord);
    } else if (command === 'clear') {
        client.commands.get('clear').execute(message, args)
    } else if(command === 'ban') {
        client.commands.get('ban').execute(message, args)
    } else if(command === 'kick') {
        client.commands.get('kick').execute(message, args)
    } else if(command === 'userinfo') {
        client.commands.get('userinfo').execute(message, args)
    } else if(command === 'serverinfo') {
        client.commands.get('serverinfo').execute(message, args)
    }
});

//commands

keepAlive();
//keeps the bot alive
client.login(process.env.TOKEN)
//login to the bot
