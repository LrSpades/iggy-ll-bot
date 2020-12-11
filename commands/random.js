module.exports = {
	name: 'random',
	cooldown: 0,
    description: "random number!",
    execute(message, args) {
        if(args[0] === undefined) {
			return message.channel.send('After `.random` input a number greater than 0, and lower than 1001.');
		}
		const maxValue = Math.floor(parseInt(args[0]));
		if(maxValue > 1000) {
			return message.channel.send('Please make sure to input a *number* less than *1001*.');
		}
		else {
			try {
				const randomInt = Math.floor(Math.random() * maxValue);
				if (typeof randomInt === 'undefined') {
					return message.channel.send('Please input a number.');
				}
				return message.channel.send(`**${randomInt}**`);
			}
			catch (error) {
				console.error(error);
				return message.channel.send('There was an error executing this command.');
			}
		}
    }
}