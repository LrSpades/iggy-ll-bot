module.exports = {
    name: 'beep',
    cooldown: 0,
    description: "this is a beep command!",
    execute(message, args, client) {
        message.channel.send('Boop.');
    }
}