module.exports = {
	name: 'avatar',
	cooldown: 0,
    description: "displays the avatar of the pinged persons!",
    execute(message) {
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
}