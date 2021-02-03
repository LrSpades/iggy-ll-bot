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

async function getRlStats(username, platform) {
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

async function getRlPfp(username, platform) {
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

async function getChesscomStats(username) {
	const uri = `https://chess.com/member/${username}`;

	logger.info(`Downloading HTML from ${uri}...`);
	const stuff = {};
	try {
		const response = await got(uri);
		const $ = cheerio.load(response.body);
		const avatar = $('div.profile-header-avatar > div > img');
		stuff.avatar = $(avatar).attr('src');
		const $stats = $('div.layout-two-column-column-two:nth-child(2) > div');
		console.log($.html($stats));

		stuff.values = $stats.toArray().map(body => {
			const divs = $(body).find('div.stat-section-stats-section').toArray();

			const player = {};
			for (div of divs) {
				const $div = $(div);

				const key = $div.attr('class');
				const value = $div.text();

				player[key] = value;
			}
			return player;
		});

		return stuff;
	}
	catch(err) {
		console.error(err);
	}
	return stuff;
}

// eslint-disable-next-line no-unused-vars
async function getWTStats() {
	const uri = `https://warthunder.com/en/community/userinfo/?nick=${username}`;

	logger.info(`Downloading HTML from ${uri}`);
}

async function scrape() {
	logger.log('info', 'Scraping data...');

	module.exports = {
		RL: {
			getRlPfp,
			getRlStats,
		},
		Chesscom: {
			getChesscomStats,
		},
	};
	const d = await getChesscomStats('bpovo1394');
	console.log(dick);

	logger.log('info', 'Done scraping!');
}

scrape();