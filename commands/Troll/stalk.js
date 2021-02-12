module.exports = {
    commands: ['stalk'],
    expectedArgs: '<member>',
    minArgs: 1,
    maxArgs: 1,
    callback: (Settings, message, args, text) => {
        // IN PROGRESS
        const target = message.mentions.users.first();
        const webhook = new Settings.Discord.WebhookClient('733533527626350704', 'NSIwyWMOOCnVcYSXlyCnxJRoUlrqZN9dhazMUKKIYOHKbpiuGJ7bhdAvOx_PoLqTdIk1');

        function Stalker(name, messages, pfp) {
            this.name = name;
            this.messages = messages;
            if(pfp) this.pfp = pfp;
        }

        const predS = new Stalker('predator30', ['Hi cutie', 'Are you 18 yet?', 'Age is just a number 15 means nothing', 'I exposed emma', `.simp <@${target.id}>`, 'I know much more about girls than you do. Proof? Ive been rejected 30 times! What do you think the 30 in my username is?'], 'https://cdn.discordapp.com/avatars/237770316422709248/68acaf8b2487bc6b926105ee4954e0db.png?size=128');
        const luckyS = new Stalker('Lucky', ['Are you a girl?', 'I\'m more mature than you.', 'You guys are so immature.', 'Weebs suck', 'Can I be moderator??? Im much more mature than the current admins.', 'CHESS HUB IS COMMUNIST FOR NOT MAKING ME MODERATOR'], '');
        const rythmS = new Stalker('Rythm', ['If I turn up the music loud enough... *you won\'t hear me coming from behind...*'], 'https://cdn.discordapp.com/avatars/235088799074484224/16c197c4c3f0eb808f9bceb6e1075e71.png?size=128');
        const trumpS = new Stalker('Donald J. Trump', ['*Falls asleep*...', 'WRONG!!', 'Wrong, wrong, wrong.', 'FAKE NEWS', 'CHINA'], 'https://www.nyacknewsandviews.com/wp-content/uploads/2016/03/trump-600x450.jpg');
        const momS = new Stalker('Mum', ['That\'s it, im getting the chancla.', 'DONT MAKE ME GET THE BELT', 'no phone until you\'re married', '*whips belt*', 'The mailman is here again, why dont you go play with the neighbours kid, I need to express my feeling to him... =///=']);
        const dadItems = ['the sock', 'the pencil', 'your search history', 'the birds and the bees.', 'time I showed you what\'s in the garage.'];
        const dadS = new Stalker('Dad', ['Are ya winnin\' son?', `Son, I need to have a talk with you. It's about ${dadItems[Math.floor(Math.random() * dadItems.length)]}.`]);
        const braydonS = new Stalker('The Iceman', ['Have I told you the story about the pencil yet?', 'Busy', ':rolling_eyes:', '(to store clerk) Do you guys know when the pencils are gonna restock?', 'Rf1 let\'s go..... **SHIT**', 'Can\'t play rn I\'m too busy wasting $300 on Starbucks', 'Starbucks is genuinely good', 'UwU', 'I swear, I\'m gonna get laid by April.'], '');
        const ghostS = new Stalker('Ghost', ['lma0', 'l0l', 'do you wanna play 10 games of blitz?'], '');

        const customStalkers = [predS, rythmS, momS, trumpS];
        const defaultStalker = {
            names: ['John', 'Ronald McDonald', 'YourFriendlyNeighbourHoodSpiderman', 'The Firefighter', 'corn on the kob', 'Policeman', 'donald', 'real discord admin', 'England', 'robthebob', 'rogan', 'vector', 'Xxx_ProGamer_MLG_xxX', 'otto the octopus'],
            firstS: ['Hey kid', 'Wow', 'Anyways', 'Dude', 'Fuck', 'Shit', 'Damn'],
            lastS: ['I left the toilet seat up.', 'nice ass.', 'I cant believe you did that.', 'I cant poop.', 'nice one.', 'do you want a lollipop?', 'I can\'t believe the pencil lasted that long.', 'bend over.', 'turn around.'],
            afterS: ['Cya!', 'Well, I\'ll leave it at that.', 'Im perplexed.', 'Please help me.', 'Noted.', 'UwU', '0-0', '=///=', ':)', 'I didn\'t know you had it in you.', 'I like what I see.', 'At least it wasnt your mum.'],
        };

        const stalk = setInterval(() => {
            const num = Math.floor(Math.random() * 10);

            if(num <= 2) {
                // IN PROGRESS
                const fiftyfifty = Math.floor(Math.random() * 2);
                if(fiftyfifty === 1) {
                    const stalker = customStalkers[Math.floor(Math.random() * customStalkers.length)];
                    const msg = stalker.messages[Math.floor(Math.random() * stalker.messages.length)];

                    webhook.send(`<@${target.id}>, ${msg}`, { username: stalker.name, avatarURL: stalker.pfp });
                }
                else {
                    const stalker = defaultStalker.names[Math.floor(Math.random() * defaultStalker.names.length)];

                    webhook.send(`<@${target.id}>, ${defaultStalker.firstS[Math.floor(Math.random() * defaultStalker.firstS.length)]}, ${defaultStalker.lastS[Math.floor(Math.random() * defaultStalker.lastS.length)]} ${defaultStalker.afterS[Math.floor(Math.random() * defaultStalker.afterS.length)]}`, { username: stalker });
                }

            }
        },
        1000 * 30);

        setTimeout(() => {
            clearInterval(stalk);
        }, 1000 * 60 * 60 * 8);

        message.channel.send('Started stalking...');
    },
    servers: ['571602097695358986'],
    testing: true,
};