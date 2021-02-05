const { MessageEmbed } = require('discord.js');

module.exports = {
    commands: ['rlstats', 'rls'],
    expectedArgs: '<platform> <username>',
    permissionError: 'You need admin permissions to run this commands',
    minArgs: 2,
    maxArgs: 2,
    callback: async (Discord, client, message, args, text, Data) => {
        // IN PROGRESS

        let platform = args.shift();
        const username = args.shift();

        switch (platform.toLowerCase()) {
            case 'xbox':
                platform = 'xbl';
                break;
            case 'playstation':
                platform = 'psn';
                break;
            default:
                return message.reply('You must use xbox or playstation for now... steam soon!');
        }

        const stats = await Data.RL.rlStats(username, platform);
        const avatar = await Data.RL.rlPfp(username, platform);

        const statsEmbed = new MessageEmbed()
        .setTitle(`${message.member.user.username}'s Rocket League Stats`)
        .setURL(`https://rocketleague.tracker.network/rocket-league/profile/${platform}/${username}/overview`)
        .setThumbnail(avatar);

        stats.forEach(playlist => {
            const keys = Object.keys(playlist);
            const name = keys.shift();
            const list = keys.map(key => {
                if(key === 'rank') return `${playlist[key]}`;
                else if(key === 'up') return `Divs Up: ${playlist[key]}`;
                else if(key == 'down') return `Divs Down: ${playlist[key]}`;
                else if(key.includes('result')) return playlist[key];
                else return `${key}: ${playlist[key]}`;
            }).join('\n');

            statsEmbed.addField(`${playlist[name]}`, list, true);
        });

        message.reply(statsEmbed);
    },
};