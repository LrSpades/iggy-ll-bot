const got = require('got')
const fs = require('fs');
const cheerio = require('cheerio')
const winston = require('winston')

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { servive: 'user-service' },
	transports: [
		new winston.transports.File({ filename: 'error.log' }),
		new winston.transports.File({ filename: 'combined.log' })
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

async function getRlStats(username, platform) {
    // Where to download the data
    const uri = `https://rocketleague.tracker.network/rocket-league/profile/${platform}/${username}/overview`
    let values
    // Download the HTML from the web server
    logger.log('info',`Downloading HTML from ${uri}...`);
        try {
            const response = await got(uri)

            const $ = cheerio.load(response.body);

            const $stats = $('tbody > tr[data-v-2dd6b9bc]');

            values = $stats.toArray().map(tr => {

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
    logger.log('info','Scraping data...')

    module.exports = {
        getRlStats,
    }

    logger.log('info','Done scraping!')
}

scrape();