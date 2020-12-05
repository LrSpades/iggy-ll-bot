module.exports = {
    name: 'say',
    description: "Make Iggy II say something!",
    execute(message, args) {
        if (!args.length) {
			return message.channel.send('No arguments provided.');
		}

		const content = [];

		args.forEach(word => {
			content.push(word);
			content.push(" ");
		});

		const string = content;

		message.channel.send(string);
    }
}