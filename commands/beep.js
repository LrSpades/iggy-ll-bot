module.exports = {
    name: 'beep',
    description: "this is a beep command!",
    execute(message) {
        message.channel.send('Boop.');
    }
}