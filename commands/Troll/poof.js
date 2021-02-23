module.exports = {
    commands: ['poof'],
    expectedArgs: '<member>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (Settings, message, args, text) => {
        const member = message.member;
        const target = message.mentions.members.first();
        const originChannel = message.channel;
        const cost = 100;
        const targetRoles = target.roles.cache;

        const filter = message => message.author.id === message.author.id;

        message.delete();

        message.channel.send(`${target}, nice roles you got there. Wanna see a magic trick? POOF! -${cost}:cookie:`);

        target.roles.set([]);
        setTimeout(() => {
            target.roles.add(targetRoles);
        }, 1000 * 20);
    },
    servers:['571602097695358986'],
    testing: true,
};
