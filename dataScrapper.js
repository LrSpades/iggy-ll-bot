const rp = require('request');
const fs = require('fs');
const cheerio = require('cheerio')

async function checkForCheater(lichess) {
    // Where to download the data
    const uri = `https://lichess.org/@/${lichess}`
    // The output filename
    const filename = 'cheater.html'

    // Download the HTML from the web server
    console.log(`Downloading HTML from ${uri}...`);
    rp(uri, (error, response, body) => {
        const cheatHTML = body;
    });
}

async function scrape() {
    console.log('Scraping data...')

    await checkForCheater('Cheat-3');

    console.log('Done scraping!')
}

scrape();