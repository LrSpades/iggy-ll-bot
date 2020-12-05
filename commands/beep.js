module.exports = {
    name: 'beep',
    description: "this is a beep command!",
    execute(message, args, client) {
        message.channel.send('Boop.');
    }
}