const Discord = require('discord.js');

const client = new Discord.Client();
const prefix = '.'
const fs = require('fs');

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
		client.commands.get('random').execute(message, args)
	}
	else if(command === 'avatar') {
		client.commands.get('avatar').execute(message)
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
	else if (command === 'bal' || command === 'balance') {
		const target = message.mentions.users.first() || message.author;
		return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);
	}
	else if (command === 'inv' || command === "inventory") {
		const target = message.mentions.users.first() || message.author;
		const user =  Users.findOne({ where: { user_id: target.id } });
		const items =  user.getItems();

		if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
		return message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
	}
	else if (command === 'transfer') {
		const currentAmount = currency.getBalance(message.author.id);
		const transferAmount = args.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
		const transferTarget = message.mentions.users.first();

		if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
		if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
		if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);

		currency.add(message.author.id, -transferAmount);
		currency.add(transferTarget.id, transferAmount);

		return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`);
	}
	else if (command === 'buy') {
		const item =  CurrencyShop.findOne({ where: { name: { [Op.like]: args } } });
		if (!item) return message.channel.send(`That item doesn't exist.`);
		if (item.cost > currency.getBalance(message.author.id)) {
			return message.channel.send(`You currently have ${currency.getBalance(message.author.id)}, but the ${item.name} costs ${item.cost}!`);
		}

		const user = Users.findOne({ where: { user_id: message.author.id } });
		currency.add(message.author.id, -item.cost);
		user.addItem(item);

		message.channel.send(`You've bought: ${item.name}.`);
	}
	else if (command === 'shop') {
		const items = CurrencyShop.findAll();
		return message.channel.send(items.map(item => `${item.name}: ${item.cost}💰`).join('\n'), { code: true });
	}
	else if (command === 'leaderboard') {
		return message.channel.send(
			currency.sort((a, b) => b.balance - a.balance)
				.filter(user => client.users.cache.has(user.user_id))
				.first(10)
				.map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance}💰`)
				.join('\n'),
			{ code: true }
		);
	}
	else if (command === "add") {
		const target = message.mentions.users.first();
		const transferAmount = args.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));

		currency.add(target.id, transferAmount)
	}
});

client.login(process.env.token);