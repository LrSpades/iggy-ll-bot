module.exports = {
    name: 'ping',
    cooldown: 0,
    description: "this is a ping command!",
    execute(message,) {
		message.channel.send(`**Pong!**`);
    }
}