module.exports = {
    name: 'donate',
    cooldown: 0,
    description: "Donate cookies to a member!",
    execute(message, args, client, beanStatus) {
        if(beanStatus === false) return message.channel.send('Bean is currently down or not working at the moment...')

			const userID = message.author.id;
			const targetID = message.mentions.members.first().id;
			const Bean = client.users.cache.get('632260979148718084');
			const origin = message.channel.id;
			const donation = args[0];

			let filter = message => message.author.id === message.author.id

    			Bean.send(`-${donation} ${userID}\n${donation} ${targetID}`).then(() => {
    			Bean.dmChannel.awaitMessages(filter, {
        			max: 1,
        			time: 10000,
        			errors: ['time'] 
    			}).then(message => {
          			message = message.first()
          			if (message.content.toUpperCase() == 'SUCCESSFUL') {
            			client.channels.cache.get(origin).send(`Donated 10 cookies to <@${targetID}>!`)
					}
					else if (message.content.toUpperCase() == 'FAILED') {
            			client.channels.cache.get(origin).send(`Failed to donate, you might not have enough cookies to donate!`)
					}
					else {
            			message.channel.send(`Terminated: Invalid Response`)
          			}
        		}).catch(collected => {
					message.channel.send('Timeout');
        		});
    		})
    }
}