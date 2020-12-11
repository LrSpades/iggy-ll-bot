module.exports = {
    name: "daily",
    cooldown: 86400,
    description: "Get a certain amount of money for a day.",
    execute(message, Data) {
        const user = message.member.id;
        const dailyAmount = 500

        Data.Users.get(user).balance += dailyAmount;

        message.channel.send(`Nice, you got ${dailyAmount} for this Daily! Your balance is now ${Data.Users.get(user).balance}!!)
    }
}