module.exports = {
    commands: ['hijack'],
    expectedArgs: '<member>',
    minArgs: 1,
    maxArgs: 1,
    callback: (client, message, args, text, DataScrapper) => {
        const user = message.author;
        const target = message.mentions.members.first();
        const Bean = client.channels.cache.get('790023648064700436');
        const originChannel = message.channel;
        const cost = 25;

		if(!target.voice.channel) return message.channel.send(`${target.user.username} is not in a voice channel.`);
		if(!args) return message.channel.send('You need to mention a victim...');

        const filter = m => m.author.id === message.author.id;

        Bean.send(`-${cost} ${user.id}`).then(() => {
            Bean.awaitMessages(filter, {
                max: 1,
                time: 3000,
                errors: ['time'],
            }).then(m => {
                if(m.content.toUpperCase() === 'SUCCESS') {
                    client.channels.cache.get(originChannel.id).send('Hijacking in the process >:D');

					target.voice.setDeaf(true).catch(err => {console.log(err);});
					target.voice.setMute(true).catch(err => {console.log(err);});
					target.voice.setChannel('732086774746185798').catch(err => {console.log(err);});

					setTimeout(() => {
						target.voice.setDeaf(false).catch(err => {console.log(err);});
						target.voice.setMute(false).catch(err => {console.log(err);});
					}, 5000);
                }
                else {
                    originChannel.send('You don\'t have enough cookies!');
                }
            }).catch(collected => {
                message.reply('Bean didn\'t respond, sorry');
            });
        });
    },
    servers:['571602097695358986'],
};