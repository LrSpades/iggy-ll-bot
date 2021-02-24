module.exports = {
    commands: ['countdown', 'cd'],
    expectedArgs: '<num>',
    minArgs: 1,
    maxArgs: 1,
    callback: (Settings, message, args, text) => {
        let count = args.shift();

        const maxAmount = 20;
        const minAmount = 5;

        if(count > maxAmount || count <= minAmount) return message.reply(`Please choose a number between ${maxAmount} and ${minAmount}...`);

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
    },
};
