module.exports = {
    commands: ['countdown', 'cd'],
    expectedArgs: '<num>',
    minArgs: 1,
    maxArgs: 1,
    callback: (Discord, client, message, args, text, DataScrapper) => {
        let count = args.shift();

        if(count > 60 || count <= 0) return message.reply('Please choose a number between 60 and 0...');

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