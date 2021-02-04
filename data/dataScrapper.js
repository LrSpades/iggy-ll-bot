/* eslint-disable no-undef */
const got = require('got');
const cheerio = require('cheerio');
const winston = require('winston');

const logger = winston.createLogger({
	level: 'info',
	defaultMeta: { servive: 'user-service' },
	transports: [
		new winston.transports.File({ filename: 'error.log' }),
		new winston.transports.File({ filename: 'combined.log' }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

async function rlStats(username, platform) {
	// Where to download the data
	const uri = `https://rocketleague.tracker.network/rocket-league/profile/${platform}/${username}/overview`;
	let values;
	// Download the HTML from the web server
	logger.log('info', `Downloading HTML from ${uri}...`);
	try {
		const response = await got(uri);

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
				const value = $div.text().replace(/(\r\n|\n|\r)/gm, '').replace(/(•)/gm, ' ');

				player[key] = isNaN(+value) ? value : +value;
			}

			return player;
		});
	}
	catch (err) {
		console.log(err.response.body);
	}

	return values;
}

async function rlPfp(username, platform) {
	// Where to download the data
	const uri = `https://rocketleague.tracker.network/rocket-league/profile/${platform}/${username}/overview`;
	// Download the HTML from the web server
	logger.log('info', `Downloading HTML from ${uri}...`);
	try {
		const response = await got(uri);

		const $ = cheerio.load(response.body);

		const img = $('.ph-avatar__image');
		const $img = $(img);
		return $img.attr('src');
	}
	catch (err) {
		console.log(err);
	}
}

async function scrape() {
	logger.log('info', 'Scraping data...');

	module.exports = {
		RL: {
			rlStats,
			rlPfp,
		},
	};

	console.log('Done scraping!');
}

scrape();