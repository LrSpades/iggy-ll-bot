const fs = require('fs');

const content = fs.readFileSync('./data/users.txt', {encoding:"utf8"});
const ids = content.split("\n");

const bals = fs.readFileSync('./data/balance.txt', {encoding:"utf8"})
const balances = bals.split("\n")

function User (id, balance, position) {
    this.balance = Number(balance);
    this.position = position;
    this.id = id;
}

let counter = -1;
const members = ids.map(member => {
    counter++
    return member = new User(member, balances[counter], counter)
})


const Data = {
    Users: {
             get(id){
             let user = "nouserfound";
             members.forEach(player => {
                    if(player.id != id) return;
                    user = player;
                })
            return user;
            }
    }
}

module.exports = {
    Users: {
        bals: balances,
        cache: members,
        counter: counter,
        get(id){
            let user = "nouserfound";
            members.forEach(player => {
                   if(player.id != id) return;
                   user = player;
               })
            return user;
            }
    },
    System: {
        Sync() {
            const syncBalance = [];
            members.forEach(member => {
                syncBalance.push(member.balance);
            })
            const newBalanceData = syncBalance.join("\n")
            fs.writeFileSync('./data/balance.txt', newBalanceData, (err) => {
                if(err){
                    console.log(err);
                } else {
                    console.log('Succesfully synced database.')
                }
            })
        },
    }
}