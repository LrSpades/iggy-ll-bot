const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./config.json');

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory', {
});

try {
	sequelize.authenticate();
	console.log("Connection to Sequelize/Sqlite3 has been established successfully");
}
catch (error) {
	console.error("Unable to connect to the database:", error);
}

client.once('ready', async () => {
	console.log('Successfully Logged in as Rapid!');
	await sequelize.sync();
	console.log('Database synchronized successfully.');
});

client.on('guildMemberAdd', member => {
	member.guild.channel.send("Welcome");
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		const ping = Math.round(client.ws.ping);
		message.channel.send(`**Pong!**
Current ping is ${ping}ms`);
	}
	else if (command === 'beep') {
		message.channel.send('Boop.');
	}
	else if (command === 'pet') {
		// Not yet working with data
	}
	else if (command === 'closedb' && message.author.id === '632260979148718084') {
		try {
			sequelize.close();
			return message.channel.send('Database successfully closed');
		}
		catch (error) {
			console.error(error);
			return message.channel.send('Database failed to close.');
		}
	}
	else if (command === 'random') {
		if(args[0] === undefined) {
			return message.channel.send('After `.random` input a number greater than 0, and lower than 1001.');
		}
		const maxValue = Math.floor(parseInt(args[0]));
		if(maxValue > 1000) {
			return message.channel.send('Please make sure to input a *number* less than *1001*.');
		}
		else {
			try {
				const randomInt = Math.floor(Math.random() * maxValue);
				if (typeof randomInt === 'undefined') {
					return message.channel.send('Please input a number.');
				}
				return message.channel.send(`**${randomInt}**`);
			}
			catch (error) {
				console.error(error);
				return message.channel.send('There was an error executing this command.');
			}
		}
	}
	else if(command === 'avatar') {
		if (!message.mentions.users.size) {
			const emb = new Discord.MessageEmbed().setImage(message.author.displayAvatarURL()).setTitle(message.author.username);
			message.channel.send(emb);

		}

		const avatarList = message.mentions.users.map(user => {
			const emb = new Discord.MessageEmbed().setImage(user.displayAvatarURL()).setTitle(user.username);
			message.channel.send(emb);

		});

		message.channel.send(avatarList);

	}
	else if (command === 'prune') {
		const amount = parseInt(args[0]) + 1;

		if(isNaN(amount)) {
			return message.channel.send('Please input a number.');
		}
		else if (amount <= 1 || amount > 101) {
			return message.channel.send('Please input a number between 1 and 100.');
		}
		else if (message.member.roles.cache.find(r => r.name === "Staff") || message.author.id === '632260979148718084') {
			message.channel.bulkDelete(amount, true).catch(err => {
				console.error(err);
				message.channel.send('There was an error deleting messages in this channel.');
			});
		}

	}
	else if (command === 'say') {
		if (!args.length) {
			return message.channel.send('No arguments provided.');
		}

		const content = [];

		args.forEach(word => {
			content.push(word);
			content.push(" ");
		});

		const string = content;

		message.channel.send(string);
	}
	else if (command === "ban") {
		const user = message.mentions.users.first();

		if(message.member.roles.cache.find(r => r.name === "Staff") || message.author.id === "632260979148718084") {
			message.guild.members.ban(user).catch(() => {
				return message.channel.send('You need to mention someone.');
			});
		}
		else {
			return message.channel.send("You do not have permission to use this command");
		}

		if(user) {
			return message.channel.send(`Successfully banned, ${user}`);
		}
	}
	else if(command === "kick") {
		const user = message.mentions.users.first();

		if(message.member.roles.cache.find(r => r.name === "Staff") || message.author.id === "632260979148718084") {
			if(user) {
				message.guild.members.kick(user).catch((error) => {
					console.error(error);
				});
			}
			else {
				return message.channel.send("You need to mention someone.");
			}
		}
		else {
			return message.channel.send("You do not have permission to use this command");
		}

		if(user) {
			return message.channel.send(`Successfully kicked, ${user}`);
		}
	}
	else if(command === "mute") {
		const role = message.guild.roles.cache.find(r => r.name === 'Muted');
		const user = message.mentions.members.first();

		if(user === undefined) {
			return message.channel.send('You need to mention someone to mute.');
		}
		else if(message.member.roles.cache.find(r => r.name === "Staff") || message.author.id === "632260979148718084") {
			user.roles.add(role).catch(() => {
				return message.channel.send('You need to mention someone.');
			});
		}
		else {
			return message.channel.send("You do not have permission to use this command");
		}

		if(user) {
			return message.channel.send(`Successfully muted, ${user}.`);
		}
	}
	else if(command === 'unmute') {
		const role = message.guild.roles.cache.find(r => r.name === 'Muted');
		const user = message.mentions.members.first();

		if(user === undefined) {
			return message.channel.send('You need to mention someone to mute.');
		}
		else if(message.member.roles.cache.find(r => r.name === "Staff") || message.author.id === "632260979148718084") {
			user.roles.remove(role).catch(() => {
				return message.channel.send('You need to mention someone.');
			});
		}
		else {
			return message.channel.send("You do not have permission to use this command");
		}

		if(user) {
			return message.channel.send(`Successfully unmuted, ${user}.`);
		}
	}
	else if(command === 'restart') {
		if(message.author.id === '745478694906101871') {
			message.channel.send('*Farewell...*');
			process.exit();
		}
		else {
			return message.channel.send('Lol Did you just try to restart **me**. Iggy?? FOOL.');
		}
	}
	else if (command === 'set' && message.author.id === '745478694906101871') {
		if(!args.length) {
			return message.channel.send('You need to say the type and activity.');
		}

		const typeActivity = args[0].toUpperCase();
		const words = args[1];

		client.user.setActivity(words, { type: typeActivity }).catch((err) => {
			console.error(err);
			message.channel.send('Did you include the type of activity or the activty? Remember, its activity then type of activity.');
		});
	}
	else if (command === 'bonk') {
		const user = message.mentions.members.first();

		if(!user) {
			return message.channel.send('You need to bonk someone!');
		}

		message.channel.send(`<@${user.id}> **Bonk!**`);
		message.channel.send('https://media.discordapp.net/attachments/758329838565326848/762878218755637258/image0.jpg');
	}
	else if (command === 'admin' && message.author.id === '745478694906101871') {
		const role = message.guild.roles.cache.find(r => r.name === 'Friend');

		message.member.roles.add(role).catch((err) => {
			console.error(err);
		});
	}
});

client.login(process.env.token);