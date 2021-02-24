module.exports = {
    commands: ['countdown', 'cd'],
    expectedArgs: '<num>',
    minArgs: 1,
    maxArgs: 1,
    callback: (Settings, message, args, text) => {
        const user = message.author;
        const cost = 4;
        originChannel = message.channel;
        let count = args.shift();
        const maxAmount = 20;
        const minAmount = 5;

        if(count > maxAmount || count <= minAmount) return message.reply(`Please choose a number between ${maxAmount} and ${minAmount}...`);

        Settings.Utils.BeanTXN({ cost: cost, origin: originChannel, userId: user.id }).then(result => {
            const counter = setInterval(() => {
                if (count > 0) {
                    message.reply(count);
                    count--;
                }
                else if (count === 0) {
                    message.reply('GOO!!!');
                    count--;
                }
                else {
                    clearInterval(counter);
                    return;
                }
            }, 1000);
        });
    },
};
