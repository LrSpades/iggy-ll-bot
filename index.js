const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '.';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready' , () => {
    console.log('Rapid successfully logged in to Discord.')
});

client.on('message', message => {
   if(!message.content.startsWith(prefix) || message.author.bot) return;

   const args = message.content.slice(prefix.length).split(/ +/);
   const command = args.shift().toLowerCase()

   if(command === 'ping') {
       client.commands.get('ping').execute(message, args);
   }
});

client.login("Nzg0MTM5OTUwMzE2MDYwNzAy.X8k9PA.GtGNvBeSQXY6Z3hfuj0QGdJfpAI");