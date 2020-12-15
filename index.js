const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '.'
const fs = require('fs');
const Data = require('./dbInit.js')
let beanStatus = true;

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

function User (id, balance, position) {
    this.balance = Number(balance);
    this.position = position;
    this.id = id;
}

const cooldowns = new Discord.Collection();

client.once('ready', async () => {
	console.log('Successfully Logged in as Rapid!');
});

client.on("guildMemberAdd", member => {
	console.log('hi')
	const user = new User(member.id, Data.Users.bals[Data.Users.counter], Data.Users.counter);
	client.users.cache.get('632260979148718084').send(member.user.id);
  });
  
client.on("guildMemberRemove", (member) => {
})

client.on('message', message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if(message.guild.id === "751090237651943556") {
		if(message.author.bot || message.channel.type === "dm") return;
		const income = 1
		Data.Users.get(message.member.id).balance += income;
	
		if (!message.content.startsWith(prefix)) return;
	
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}
	
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;
	
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
	
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
			}
		}
	
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	
	
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
		else if (command === "countbal" && message.member.id === "632260979148718084") {
			client.commands.get('countbal').execute(client, Data)
		}
		else if (command === "daily") {
			client.commands.get('daily').execute(message, Data)
		}
	}
	else if (message.guild.id === "571602097695358986") {
		if(command === "donate") {
			if(beanStatus === false) return message.channel.send('Bean is currently down or not working at the moment...')

			const userID = message.author.id;
			const targetID = message.mentions.members.first().id;
			const transaction = client.users.cache.get('632260979148718084');
			const origin = message.channel.id;
			const donation = args[0];

			let filter = m => m.author.id === message.author.id
    			transaction.send(`-${donation} ${userID}\n${donation} ${targetID}`).then(() => {
    			message.channel.awaitMessages(filter, {
        			max: 1,
        			time: 10000,
        			errors: ['time']
    			}).then(message => {
          			message = message.first()
          			if (message.content.toUpperCase() == 'SUCCESSFUL') {
            			client.channels.cache.get(origin).send(`Donated 10 cookies to <@${targetID}>!`)
					}
					else if (message.content.toUpperCase() == 'FAILED') {
            			client.channels.cache.get(origin).send(`Failed to donate, you might not have enough cookies to donate!`)
					}
					else {
            			message.channel.send(`Terminated: Invalid Response`)
          			}
        		}).catch(collected => {
					message.channel.send('Timeout');
        		});
    		})			
		}
	}
	
});

client.login("Nzg0MTM5OTUwMzE2MDYwNzAy.X8k9PA.FepGfpmZDfM9pJVuVnGzjYRUNmk");