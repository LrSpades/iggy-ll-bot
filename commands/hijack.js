module.exports = {
    name: 'hijack',
    cooldown: 0,
    description: "Hijack users in vc!",
    execute(args, message, client, beanStatus) {
        const user = message.author;
			const target = message.mentions.members.first();
			const origin = message.channel;
            const Bean = client.channels.cache.get('790023648064700436');

            if(!beanStatus) return message.channel.send(`Bean is currently offline, cannot execute this command.`)
			if(!target.voice.channel) return message.channel.send(`${target.user.username} is not in a voice channel.`)
			if(!args) return message.channel.send(`You need to mention a victim...`)

			let filter = message => message.author.id === message.author.id

    			Bean.send(`-25 ${user.id}`).then(() => {
    			Bean.dmChannel.awaitMessages(filter, {
        			max: 1,
        			time: 10000,
        			errors: ['time'] 
    			}).then(message => {
          			message = message.first()
          			if (message.content.toUpperCase() == 'SUCCESS') {

						client.channels.cache.get(origin.id).send('Hijacking in the process >:D')

						target.voice.setDeaf(true).catch(err => {console.log(err)});
						target.voice.setMute(true).catch(err => {console.log(err)});
						target.voice.setChannel('732086774746185798').catch(err => {console.log(err)});

						setTimeout(() => {
							target.voice.setDeaf(false).catch(err => {console.log(err)});
							target.voice.setMute(false).catch(err => {console.log(err)});
						}, 5000)
					}
					else {
						client.channels.cache.get(origin.id).send(`Insufficient funds!`)
						console.log(message.content);
					}
        		}).catch(collected => {
					message.channel.send('Timeout');
        		});
    		})
    }
}