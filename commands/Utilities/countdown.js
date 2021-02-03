module.exports = {
    commands: ['countdown', 'cd'],
    expectedArgs: '<num>',
    permissionError: 'You need admin permissions to run this commands',
    maxArgs: 1,
    callback: (client, message, args, text, DataScrapper) => {
        let count = args.shift();

        const counter = setInterval(() => {
            if (count > 0) {
                message.reply(count);
                count--;
            }
            else if (count === 0) {
                message.reply('GOO!!!');
            }
            else {
                clearInterval(counter);
                return;
            }
        }, 1000);
    },
};