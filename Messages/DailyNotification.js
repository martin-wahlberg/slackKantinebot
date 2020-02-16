var moment = require('moment');
const files = require('../utils/files');
const utils = require('../utils/utils');

const getWeekDay = dayNumber => {
	switch (dayNumber) {
		case 0:
			return 'søndag';
		case 1:
			return 'mandag';
		case 2:
			return 'tirsdag';
		case 3:
			return 'onsdag';
		case 4:
			return 'torsdag';
		case 5:
			return 'fredag';
		case 6:
			return 'lørdag';
		case 7:
			return 'søndag';
	}
};

exports.getDailyNotification = async () => {
	const weeksMenu = await files.get('meny.json');

	const huset =
		weeksMenu &&
		weeksMenu.huset &&
		weeksMenu.huset[getWeekDay(moment().weekday())];
	const galleriet =
		weeksMenu &&
		weeksMenu.galleriet &&
		weeksMenu.galleriet[getWeekDay(moment().weekday())];

	return {
		text: {
			type: 'mrkdwn',
			text: `Det er straks tid for lunsj! ${utils.getRandomFoodEmoji()}`
		},
		blocks: [
			{
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: `Det er straks tid for lunsj! ${utils.getRandomFoodEmoji()}`
				},
				accessory: {
					type: 'button',
					text: {
						type: 'plain_text',
						text: 'Se ukesmeny',
						emoji: true
					},
					action_id: 'show_menu'
				}
			},
			{
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: `*Dagens meny på Huset:*\n ${huset || 'Ingen meny :shrug:'}`
				}
			},
			{
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: `*Dagens meny på Galleriet:*\n ${galleriet ||
						'Ingen meny :shrug:'}`
				}
			}
		],

		icon_emoji: utils.getRandomFoodEmoji()
	};
};
