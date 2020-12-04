module.exports = {
    name: 'prune',
    description: "Prune a given amount of messages.",
    execute(message, args) {
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
}