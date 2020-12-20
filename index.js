const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = 'b.'
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

client.on('presenceUpdate', (oldPresence, newPresence) => {
    let member = newPresence.member;
    // User id of the user you're tracking status.
    if (member.id === '571638228684374033') {
        if (oldPresence.status !== newPresence.status) {
            // Your specific channel to send a message in.
            let channel = member.guild.channels.cache.get('<channelId>');
            // You can also use member.guild.channels.resolve('<channelId>');

            let text = "";

            if (newPresence.status === "online") {
                beanStatus = true;
            } else if (newPresence.status === "offline") {
                beanStatus = false;
            }
            // etc...

            channel.send(text);
        }
    }
});

client.on('message', async message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if(message.channel.type === 'dm') {
		if(message.author.id === "571638228684374033") {
			console.log(message.content);
		}
	}
	else if(message.guild.id === "751090237651943556") {
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
			// to be done
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
			client.commands.get('donate').execute(message, args, client, beanStatus)
		}
		if(command === "hijack") {
			const user = message.author;
			const target = message.mentions.members.first();
			const Bean = client.users.cache.get('632260979148718084');

			if(!target.voice.channel) return message.channel.send(`${target.user.username} is not in a voice channel.`)

			let filter = message => message.author.id === message.author.id

    			Bean.send(`-25 ${user.id}`).then(() => {
    			Bean.dmChannel.awaitMessages(filter, {
        			max: 1,
        			time: 10000,
        			errors: ['time'] 
    			}).then(message => {
          			message = message.first()
          			if (message.content.toUpperCase() == 'SUCCESSFUL') {
						target.voice.setDeaf(true).catch(err => {
							console.log(err)
						})
						target.voice.setMute(true).catch(err => {
							console.log(err)
						})

						target.voice.setChannel('732086774746185798').catch(err => {
							console.log(err)
						})

						setTimeout(() => {
							target.voice.setDeaf(false).catch(err => {
								console.log(err)
							});
							target.voice.setMute(false).catch(err => {
								console.log(err)
							});
						}, 5000)
					}
					else {
            			client.channels.cache.get(origin).send(`Insufficient funds!`)
					}
        		}).catch(collected => {
					message.channel.send('Timeout');
        		});
    		})
		}
	}
	
});

client.login("Nzg0MTM5OTUwMzE2MDYwNzAy.X8k9PA.FepGfpmZDfM9pJVuVnGzjYRUNmk");