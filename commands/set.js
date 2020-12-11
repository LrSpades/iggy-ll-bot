module.exports = {
	name: 'set',
	cooldown: 0,
    description: "Set the status of Iggy II!",
    execute(message, args, client) {
        if(!args.length) {
			return message.channel.send('You need to say the type and activity.');
		}

		const typeActivity = args[0].toUpperCase();
		const words = args[1];

		client.user.setActivity(words, { type: typeActivity }).catch((err) => {
			console.error(err);
			message.channel.send('Did you include the type of activity or the activty? Remember, its activity then type of activity.');
		});
    }
}