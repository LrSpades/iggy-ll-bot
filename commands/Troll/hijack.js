/* eslint-disable no-shadow */
module.exports = {
    commands: ['hijack'],
    expectedArgs: '<member>',
    minArgs: 1,
    maxArgs: 1,
    callback: (Settings, message, args, text) => {
        const user = message.author;
        const target = message.mentions.members.first();
        const Bean = Settings.client.channels.cache.get('790023648064700436');
        const originChannel = message.channel;
        const cost = 20;

		if(!target.voice.channel) return message.channel.send(`${target.user.username} is not in a voice channel.`);

        const filter = message => message.author.id === message.author.id;

        message.delete();

        Settings.Utils.BeanTXN({ cost: cost, origin: originChannel, userId: user.id }).then(result => {
            if(result === true) {
                Settings.client.channels.cache.get(originChannel.id).send(`Hijacking in the process >:D. -${cost} :cookie:`);

				Settings.Utils.VC.deafen(target, true);
				Settings.Utils.VC.mute(target, true);
				Settings.Utils.VC.setChannel(target, '732086774746185798');

				setTimeout(() => {
					Settings.Utils.VC.deafen(target, false);
					Settings.Utils.VC.mute(target, false);
				}, 1000 * 5);
            }
        });
    },
    servers:['571602097695358986'],
};