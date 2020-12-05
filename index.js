const Discord = require('discord.js');

const client = new Discord.Client();
const prefix = '.'

const { Users, CurrencyShop } = require('./dbObjects');
const { Op } = require('sequelize');
const currency = new Discord.Collection();

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

Reflect.defineProperty(currency, 'add', {
	/* eslint-disable-next-line func-name-matching */
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	/* eslint-disable-next-line func-name-matching */
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

client.once('ready', async () => {
	console.log('Successfully Logged in as Rapid!');
	const storedBalances = await Users.findAll();
	storedBalances.forEach(b => currency.set(b.user_id, b));
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
		const transferAmount = commandArgs.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
		const transferTarget = message.mentions.users.first();

		if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
		if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
		if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);

		currency.add(message.author.id, -transferAmount);
		currency.add(transferTarget.id, transferAmount);

		return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`);
	}
	else if (command === 'buy') {
		const item =  CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
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
});

client.login(process.env.token);