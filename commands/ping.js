module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(message, args) {
        const ping = Math.round(client.ws.ping);
		message.channel.send(`**Pong!**
Current ping is ${ping}ms`);
    }
}