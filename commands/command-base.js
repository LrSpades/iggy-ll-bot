/* eslint-disable prefer-const */
const prefix = process.env.prefix;
const { error } = require('winston');
const Data = require('../data/dataScrapper');
const Discord = require('discord.js');

const validataPermissions = (perms) => {
    const validPermissions = [
        'ADMINISTRATOR',
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ];

    for (const perm of perms) {
        if (!validPermissions.includes(perm)) {
            throw new error(`Unknown permission node "${perm}"`);
        }
    }
};

module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        permissionError = 'You do not have permission to run this command.',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback,
        cooldown = -1,
        servers = null,
    } = commandOptions;

    // Ensure hte command and aliases are in an array
    if (typeof commmands === 'string') {
        commands = [commands];
    }

    if (typeof servers == 'string') {
        commands = [commands];
    }

    console.log(`Registering command "${commands[0]}"`);

    // Ensure hte permissions are in an array and are all valid
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions];
        }

        validataPermissions(permissions);
    }

    client.on('message', message => {
        const { member, content, guild } = message;

        if(message.author.bot) return;

        if(servers) {
            for (const server of servers) {
                if (server !== message.guild.id) return;
            }
        }

        for (const alias of commands) {
            if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
                for (const permission of permissions) {
                    if (!member.hasPermission(permission)) {
                        message.reply(permissionError);
                        return;
                    }
                }

                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(r => r.name == requiredRole);

                    if (!role || !member.roles.cache.has(role.id)) {
                        message.reply(`You must have the "${requiredRole}" role to use this command.`);
                        return;
                    }
                }

                const args = content.split(/[ ]+/);

                args.shift();

                if (args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
                    message.reply(`Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`);
                    return;
                }

                callback(Discord, client, message, args, args.join(' '), Data);

                return;
            }
        }
    });
};