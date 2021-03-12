const Discord = require('discord.js');
const Data = require('./data/dataScrapper');
const client = new Discord.Client();
const Bean = client.channels.cache.get('790023648064700436');
const fs = require('fs');
const path = require('path');


module.exports = {
    Admins: [],
    Discord: Discord,
    owner: {
        id: '632260979148718084',
    },
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

            client.channels.cache.get('790023648064700436').send(`-${cost} ${userId}`).then(() => {
                client.channels.cache.get('790023648064700436').awaitMessages(message => message.author.id === message.author.id, {
                    max: 1,
                    time: 3000,
                    errors: ['time'],
                }).then(message => {
                    message = message.first();
                    if(message.content === 'Success') {
                        console.log(`Transaction occured | ${new Date()} | Amount: ${cost} | Origin: ${origin} | User: ${userId}`);
                        return true;
                    }
                    else {
                        return origin.send(`You don't have enough cookies! (You need ${cost} cookies...)`);
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
