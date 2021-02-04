module.exports = {
    commands: ['say'],
    expectedArgs: '<text>',
    callback: (client, message, args, text, DataScrapper) => {
        message.channel.send(text);
    },
};