const Data = require('../dbInit.js')

module.exports = {
    name: 'bal',
    description: "Check your balance!!!",
    execute(message, client, args, Data) {
        const user = message.member.id;
        console.log(user)
        const balance = Data.Users.get(user).balance;

        message.channel.send(`You currently have ${balance} gum!`)
    }
}