module.exports = {
    name: 'ban',
    description: "Ban a member!",
    execute(message) {
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
}