module.exports = {
    name: 'bal',
    description: "Check your balance!!!",
    execute(message, client, args, Data) {
        const user = message.member.id;

        const balance = Data.Users.get(user).balance;

        message.channel.send(`You currently have ${balance} gum!`)
    }
}