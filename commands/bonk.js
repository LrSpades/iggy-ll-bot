module.exports = {
    name: 'bonk',
    description: "Bonk someone...!",
    execute(message) {
        const user = message.mentions.members.first();

		if(!user) {
			return message.channel.send('You need to bonk someone!');
		}

		message.channel.send(`<@${user.id}> **Bonk!**`);
		message.channel.send('https://media.discordapp.net/attachments/758329838565326848/762878218755637258/image0.jpg');
    }
}