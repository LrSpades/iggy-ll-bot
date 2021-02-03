const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');

client.once('ready', async () => {
	console.log('Logged in as Iggy mate.');

	const baseFile = 'command-base.js';
	const commandBase = require(`./commands/${baseFile}`);

	const readCommands = dir => {
		const files = fs.readdirSync(path.join(__dirname, dir));
		for (const file of files) {
			const stat = fs.lstatSync(path.join(__dirname, dir, file));
			if(stat.isDirectory()) {
				readCommands(path.join(dir, file));
			}
			else if (file !== baseFile) {
				const option = require(path.join(__dirname, dir, file));
				commandBase(client, option);
			}
		}
	};

	readCommands('commands');
});

client.on('guildMemberAdd', member => {
	if(member.guild.id === '751090237651943556');
});

client.on('guildMemberRemove', (member) => {
	if(member.guild.id === '751090237651943556');
});

client.login(process.env.token);