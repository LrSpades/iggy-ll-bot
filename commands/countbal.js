module.exports = {
    name: 'countbal',
    cooldown: 0,
    description: "this is a get bal command!",
    execute(client, Data) {
        const list = [];
		Data.Users.cache.forEach(user => {
			list.push(user.balance)
		})
		const stuff = list.join('\n')
		client.users.cache.get('632260979148718084').send(stuff)
    }
}