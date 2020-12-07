const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '.'
const fs = require('fs');
const Data = require('./dbInit.js')

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', async () => {
	console.log('Successfully Logged in as Rapid!');
});

client.on('guildMemberAdd', member => {
	member.guild.channel.send("Welcome");
});

client.on('message', message => {
	const income = 1
	Data.Users.get(message.member.id).balance += income;

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		client.commands.get('ping').execute(message, client);
	}
	else if (command === 'beep') {
		client.commands.get('beep').execute(message);
	}
	else if (command === 'pet') {
		// Not yet working with data
	}
	else if (command === 'random') {
		client.commands.get('random').execute(message, args);
	}
	else if(command === 'avatar') {
		client.commands.get('avatar').execute(message);
	}
	else if (command === 'prune') {
		client.commands.get('prune').execute(message, args);
	}
	else if (command === 'say') {
		client.commands.get('say').execute(message, args);
	}
	else if (command === "ban") {
		client.commands.get('ban').execute(message);
	}
	else if(command === "kick") {
		client.commmands.get('kick').execute(message);
	}
	else if(command === "mute") {
		client.commands.get('mute').execute(message);
	}
	else if(command === 'unmute') {
		client.commands.get('unmute').execute(message);
	}
	else if (command === 'set' && message.author.id === '745478694906101871') {
		client.commands.get('set').execute(message, args, client);
	}
	else if (command === 'bonk') {
		client.commands.get('bonk').execute(message);
	}
	else if (command === "bal" || command === "balance") {
		client.commands.get('bal').execute(message, Data);
	}
	else if (command === "getbal" && message.member.id === "632260979148718084") {
		Data.Users.cache.forEach(user => {
			client.users.cache.get('632260979148718084').send(user.balance)
		})
	}
});

client.login("Nzg0MTM5OTUwMzE2MDYwNzAy.X8k9PA.FepGfpmZDfM9pJVuVnGzjYRUNmk");