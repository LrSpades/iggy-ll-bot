module.exports = {
    commands: ['add', 'addition'],
    expectedArgs: '<num1> <num2>',
    minArgs: 2,
    maxArgs: 2,
    callback: (client, message, args, text, DataScrapper) => {
        const num1 = !args[0];
        const num2 = !args[1];

        message.reply(`The sum is ${num1 + num2}`);
    },
};