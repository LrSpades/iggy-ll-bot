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

        const $stats = $('div[data-v-2dd6b9bc]:not(.wrapper):not(.progress):not([class^=trn])')

        console.log($.html($stats))
    }
    catch(err) {
        // console.log(err.response.body);
;    }
}

async function scrape() {
    console.log('Scraping data...')

    await getRlStats('Emerald1536', 'xbl')

    console.log('Done scraping!')
}

scrape();