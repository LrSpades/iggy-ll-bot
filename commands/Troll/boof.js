module.exports = {
    commands: ['boof'],
    expectedArgs: '<member>',
    minArgs: 1,
    maxArgs: 1,
    callback: (Settings, message, args, text) => {
        const user = message.author;
        const target = message.mentions.members.first();
        const Bean = Settings.client.channels.cache.get('790023648064700436');
        const originChannel = message.channel;
        const cost = 50;
        const mutedRole = message.guild.roles.cache.find(role => role.id == '638763146940514355');

		if(!target.voice.channel) return message.channel.send(`${target.user.username} is not in a voice channel.`);

        const filter = message => message.author.id === message.author.id;

        message.delete();

        message.send(`You monster... BOOFED ${target.username} -${cost}:cookie:`);

        const checkForTyping = setInterval(() => {
            Settings.client.on('typingStart', (channel, user) => {
                setTimeout(() => {
                    user.roles.add(mutedRole);
                }, 1000);
            });
        }, 1000 * 5);
    },
    servers:['571602097695358986'],
    testing: true,
};