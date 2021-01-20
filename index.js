const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = 'b.'
const fs = require('fs');
const Data = require('./dbInit.js')
const Bean = client.users.cache.get('571638228684374033');
const Scrape = require('./dataScrapper')
const winston = require('winston')

const logger = winston.createLogger({
	transports: [
		new winston.transports.File({ filename: 'error.log' }),
		new winston.transports.File({ filename: 'combined.log' })
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

let beanStatus = true;
client.commands = new Discord.Collection();

client.on('debug', m => logger.log('debug', m));
client.on('warn', m => logger.log('warn', m));
client.on('error', m => logger.log('error', m));
process.on('uncaughtException', error => logger.log('error', error));

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
	logger.log('info', 'Successfully Logged in as Rapid!');
});

client.on("guildMemberAdd", member => {
	if(member.guild.id === '751090237651943556');
	const user = new User(member.id, Data.Users.bals[Data.Users.counter], Data.Users.counter);
  });
  
client.on("guildMemberRemove", (member) => {
	if(member.guild.id === '751090237651943556');
	logger.log('info', `${member} just left...`)
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
			logger.log( 'info',message.content);
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
		if(command === "hijack") {
			client.commands.get('hijack').execute(args, message, client, beanStatus, Bean);
		}
		else if(command === "poker") {
			if(!args) {
				message.channel.send(`**Poker!**
Play a game of Texas Holdem poker!
\`.poker create\` : Create a poker game!
\`.poker start\` : Start the game!
\`.poker startingchips [Number]\` : Chnage the starting amount of chips for each player.
\`.poker kick\` : Kick a player from a game!`);
			}
			const subcommand = args.shift();

			if(subcommand === "create") {

			}
			else if(subcommand === "start"){
				let deck = []
			}
			else if(subcommand === "startingchips") {

			}
			else if(subcommand=== "kick") {

			}
		}
		else if(command === 'rlstats'){
			if(args.legnth < 2) return message.channel.send('Not enough arguments required.')
			
			let platform = args.shift();
			const username = args.shift();

			if(platform === 'xbox'){
				platform = 'xbl'
			}
			else if(platform === 'ps'){
				platform = 'psn'
			}
			else if(platform === 'steam'){

			}
			else{
				message.channel.send('Platform given was invalid. Please use "xbox", "steam" or "ps".')
			}

			const stats = await Scrape.getRlStats(username, platform)

			const playerStats = new Discord.MessageEmbed()
				.setTitle(`${username}'s Rocket League Stats`)

			stats.forEach(playlist => {
				const stat = Object.keys(playlist);
				const name = stat.shift();
				const ss = stat.map(s => {
					return `${s}: ${playlist[s]}`
				}).join('\n')

				playerStats.addField(`${playlist[name]}`, `${ss}`, true);
				})
			message.channel.send(playerStats);
		}
		else if(command === "countdown"){
			message.channel.send('The countdown will start at 10 and end after 0, when I say GO!')
			for(i = 10; i > 0; i--){
				setTimeout(async () => {
					if(i === 0){
						await message.channel.send('GO!!')
					}
					else{
						await message.channel.send(i);
					}
				}, 1000)
			}
		}
	}
	
});

client.login(process.env.token);