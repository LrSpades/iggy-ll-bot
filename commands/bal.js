module.exports = {
    name: 'bal',
    cooldown: 0,
    description: "Check your balance!!!",
    execute(message, Data) {
        const user = message.member.id;
        console.log(user)
        const balance = Data.Users.get(user).balance;

        message.channel.send(`You currently have ${balance} gum!`)
    }
}