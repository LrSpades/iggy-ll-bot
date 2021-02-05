module.exports = {
    commands: ['stalk'],
    expectedArgs: '<member>',
    minArgs: 1,
    maxArgs: 1,
    callback: (client, message, args, text, DataScrapper) => {
        // IN PROGRESS
        const target = message.mentions.users.first();

        const webhooks = message.channel.fetchWebhooks();
        const webhook = webhooks.first();
        function Stalker(name, messages, pfp) {
            this.name = name;
            this.messages = messages;
            if(pfp) this.pfp = pfp;
        }
        const predS = new Stalker('predator30', ['I can smell your feet...', 'Are you 18 yet?', 'Age is just a number 15 means nothing'], 'https://cdn.discordapp.com/avatars/237770316422709248/68acaf8b2487bc6b926105ee4954e0db.png?size=128');
        const rythmS = new Stalker('Rythm', ['If I turn up the music loud enough... *you won\'t hear me coming.*'], 'https://cdn.discordapp.com/avatars/235088799074484224/16c197c4c3f0eb808f9bceb6e1075e71.png?size=128');
        const trumpS = new Stalker('Donald J. Trump', ['*Falls asleep*...'], 'https://www.nyacknewsandviews.com/wp-content/uploads/2016/03/trump-600x450.jpg');
        const momS = new Stalker('Mom', ['That\'s it, im getting the sandal.', 'DONT MAKE ME GET THE BELT', 'no phone until you\'re married', 'Sorry son, no more starbucks every 5 hour interval', '*whips belt*']);

        const customStalkers = [predS, rythmS, momS, trumpS];
        const defaultStalker = new Stalker(['john doe', 'Xx_ur-dad-succs_xX', 'Joe mama'], ['I can smell you from outside.', 'There\'s a hole in your pants.']);

        const stalk = setInterval(() => {
            const num = Math.floor(Math.random() * 10);

            if(num <= 3) {
                // IN PROGRESS
                const fiftyfifty = Math.floor(Math.random() * 2);
                if(fiftyfifty === 1) {
                    const stalker = customStalkers[Math.floor(Math.random() * customStalkers.length)];
                    const msg = stalker.messages[Math.floor(Math.random() * customStalkers.length)];

                    webhook.send(`<@${target.id}>, ${msg}`, { username: stalker.name, avatarURL: stalker.pfp });
                }
                else {
                    const stalker = defaultStalker.name[Math.floor(Math.random() * customStalkers.length)];
                    const msg = defaultStalker.messages[Math.floor(Math.random() * customStalkers.length)];

                    webhook.send(`<@${target.id}>, ${msg}`, { username: stalker });
                }

            }
        },
        1000 * 30);

        stalk();

        setTimeout(() => {
            clearInterval(stalk);
        }, 1000 * 60 * 60 * 8);
    },
    servers: ['571602097695358986'],
};