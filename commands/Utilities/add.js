module.exports = {
    commands: ['add', 'addition'],
    expectedArgs: '<num1> <num2>',
    minArgs: 2,
    maxArgs: 2,
    callback: (Settings, message, args, text) => {
        const num1 = args[0];
        const num2 = args[1];

        message.reply(`The sum is ${num1 + num2}`);
    },
};