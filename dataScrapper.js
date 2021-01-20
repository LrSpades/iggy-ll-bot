const got = require('got')
const fs = require('fs');
const cheerio = require('cheerio')

async function getRlStats(username, platform) {
    // Where to download the data
    const uri = `https://rocketleague.tracker.network/rocket-league/profile/${platform}/${username}/overview`

    // Download the HTML from the web server
    console.log(`Downloading HTML from ${uri}...`);
        try {
            const response = await got(uri)

            const $ = cheerio.load(response.body);

            const $stats = $('tbody > tr[data-v-2dd6b9bc]');

            const values = $stats.toArray().map(tr => {

                const divs = $(tr).find('div[class]:not(.fill):not([role]):not(.wrapper):not(div div.rank)').toArray();

                const player = {};

                // Parse the <div>
                for(div of divs) {
                    const $div = $(div);
                
                    // Map the td class attr to its value
                    let key = $div.attr('class');
                    if(key === 'value') key = 'matches';
                    let value;

                    value = $div.text().replace(/(\r\n|\n|\r)/gm, "").replace(/(•)/gm, " ");

                    player[key] = isNaN(+value) ? value : +value;
                }

                return player;
            });
        }
        catch (err) {
            
        }

    return values;
}

async function scrape() {
    console.log('Scraping data...')

    module.exports = {
        getRlStats,
    }

    console.log('Done scraping!')
}

scrape();