module.exports = {
    commands: ['say'],
    expectedArgs: '<text>',
    minArgs: 1,
    callback: (Settings, message, args, text) => {
        message.channel.send(text);
        message.delete({ timeout: 0 });
    },
    permissions: ['BAN_MEMBERS'],
};