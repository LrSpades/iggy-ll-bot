module.exports = {
    commands: ['boof'],
    expectedArgs: '<member>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (Settings, message, args, text) => {
        const member = message.member;
        const target = message.mentions.members.first();
        const Bean = Settings.client.channels.cache.get('790023648064700436');
        const originChannel = message.channel;
        const cost = 100;
        const mutedRole = message.guild.roles.cache.find(r => r.name == 'Muted');

        const filter = message => message.author.id === message.author.id;

        message.delete();

        message.channel.send(`You monster... BOOFED ${target} -${cost}:cookie:`);

        Settings.client.on('startTyping', async (channel, user) => {
            if(target.id != user.id) return console.log(target + user);

            target.roles.add(mutedRole).catch(err => console.error(err));
            await setTimeout(() => {target.roles.remove(mutedRole).catch(err => console.error(err));}, 1000);
            return;
        });
    },
    servers:['571602097695358986'],
    testing: true,
};
