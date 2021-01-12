module.exports = {
    name: 'donate',
    cooldown: 0,
    description: "Donate cookies to a member!",
    execute(message, args, client, beanStatus) {
        if(beanStatus === false) return message.channel.send('Bean is currently down or not working at the moment...')

			const userID = message.author.id;
			const targetID = message.mentions.members.first().id;
			const Bean = client.channels.cache.get('790023648064700436');
			const origin = message.channel.id;
			const donation = Math.abs(parseInt(args[0]));

			let filter = message => message.author.id === message.author.id
    			Bean.send(`-${donation} ${userID}`).then(() => {
    			Bean.awaitMessages(filter, {
        			max: 1,
        			time: 10000,
        			errors: ['time'] 
    			}).then(message => {
          			message = message.first()
          			if (message.content.toUpperCase() == 'SUCCESSS') {
						  Bean.send(`${donation} ${targetID}`)
            			client.channels.cache.get(origin).send(`Donated 10 cookies to <@${targetID}>!`)
					}
					else {
            			client.channels.cache.get(origin).send(`Insufficient funds!`)
					}
        		}).catch(collected => {
					message.channel.send('Timeout');
        		});
    		})
    }
}