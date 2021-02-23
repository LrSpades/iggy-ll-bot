module.exports = {
    commands: ['boof'],
    expectedArgs: '<member>',
    minArgs: 1,
    maxArgs: 1,
    callback: (Settings, message, args, text) => {
        const member = message.member;
        const target = message.mentions.members.first();
        const Bean = Settings.client.channels.cache.get('790023648064700436');
        const originChannel = message.channel;
        const cost = 50;
        const mutedRole = message.guild.roles.cache.find(r => r.name == 'Muted');

        const filter = message => message.author.id === message.author.id;

        message.delete();

        message.channel.send(`You monster... BOOFED ${target.username} -${cost}:cookie:`);

        const checkForTyping = setInterval(() => {
            Settings.client.on('typingStart', (channel, user) => {
                setTimeout(() => {
                    member.roles.add(mutedRole).catch(err => {console.error(err)});
                    setTimeout(() => {
                        member.roles.remove(mutedRole).catch(err => {console.error(err)});
                    }, 1000)
                }, 1000);
                
                return
            });
        }, 1000 * 5);
    },
    servers:['571602097695358986'],
    testing: true,
};
