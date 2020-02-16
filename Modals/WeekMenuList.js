const files = require('../utils/files');
const utils = require('../utils/utils');

const getWeekMenuText = locationMenu =>
	locationMenu
		? Object.entries(locationMenu).reduce((acc, cur) => {
				const [key, value] = cur;
				return `${acc}\n\n*${key.charAt(0).toUpperCase() +
					key.substring(1)}*\n>${value
					.replace(/\n/g, ', ')
					.replace(/ ,/g, ',')
					.replace(/:,/g, ':')
					.trim()
					.replace(/,$/, '')}`;
		  }, '')
		: 'Ingen meny :shrug:';

const getBlocksForLocation = (locationName, locationMenu) => [
	{
		type: 'section',
		text: {
			type: 'mrkdwn',
			text: `*Ukens meny på ${locationName}* ${utils.getRandomFoodEmoji()}`
		}
	},
	{
		type: 'section',
		text: {
			type: 'mrkdwn',
			text: getWeekMenuText(locationMenu)
		}
	},
	{
		type: 'context',
		elements: [
			{
				type: 'mrkdwn',
				text: `/kantinemeny ${locationName.toLowerCase()}`
			}
		]
	},
	{
		type: 'divider'
	}
];

exports.getWeekMenuList = async selectedLocation => {
	const meny = await files.get('meny.json');
	const huset = meny.huset || null;
	const galleriet = meny.galleriet || null;
	selectedLocation === 'huset'
		? utils.log('kantinemeny_huset')
		: selectedLocation === 'galleriet'
		? utils.log('kantinemeny_galleriet')
		: utils.log('kantinemeny_all');
	const blocks =
		selectedLocation === 'huset'
			? getBlocksForLocation('Huset', huset)
			: selectedLocation === 'galleriet'
			? getBlocksForLocation('Galleriet', galleriet)
			: [
					...getBlocksForLocation('Huset', huset),
					...getBlocksForLocation('Galleriet', galleriet)
			  ];

	return {
		type: 'modal',
		title: {
			type: 'plain_text',
			text: `Ukesmeny`,
			emoji: true
		},
		close: {
			type: 'plain_text',
			text: 'Lukk',
			emoji: true
		},
		blocks
	};
};
