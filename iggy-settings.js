const Discord = require('discord.js');
const Data = require('./data/dataScrapper');
const client = new Discord.Client();
const Bean = client.channels.cache.get('790023648064700436');
const fs = require('fs');
const path = require('path');

module.exports = {
    Discord: Discord,
    client: client,
    Data: Data,
    Utils: {
        VC: {
            async setChannel(target, channelId) {
                target.voice.setChannel(channelId).catch(err => {console.log(err);});
            },
            async deafen(target, toggle) {
                target.voice.setDeaf(toggle).catch(err => {console.log(err);});
            },
            async mute(target, toggle) {
                target.voice.setMute(toggle).catch(err => {console.log(err);});
            },
        },
        Bean: Bean,
        async BeanTXN(options) {
            let {
                cost = null,
                origin = null,
                userId = null,
            } = options;

            Bean.send(`-${cost} ${userId}`).then(() => {
                Bean.awaitMessages(message => message.author.id === '571638228684374033', {
                    max: 1,
                    time: 3000,
                    errors: ['time'],
                }).then(message => {
                    message = message.first();
                    if(message.content === 'Success') {
                        return true;
                    }
                    else {
                        origin.send(`You don't have enough cookies! (You need ${cost} cookies...)`);
                    }
                }).catch(collected => {
                    console.log('COLLECTED' + collected);
                });
            });
        },
    },
    fs: fs,
    path: path,
};