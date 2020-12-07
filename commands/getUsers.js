module.exports = {
    name: "getuser",
    description: "Gets all user ids.",
    execute(message, args, client) {
        const Guild = client.guilds.cache.get("751090237651943556"); // Getting the guild.
        const Members = Guild.members.cache.map(member => member.id); // Getting the members and mapping them by ID.
        console.log(Members);
    }
}