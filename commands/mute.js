module.exports = {
	name: 'mute',
	cooldown: 0,
    description: "Mute a member!",
    execute(message) {
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
}