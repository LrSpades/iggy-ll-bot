module.exports = {
    commands: ['say'],
    expectedArgs: '<text>',
    minArgs: 1,
    callback: (client, message, args, text, DataScrapper) => {
        message.channel.send(text);
        message.delete({ timeout: 0 });
    },
    permissions: ['BAN_MEMBERS'],
};