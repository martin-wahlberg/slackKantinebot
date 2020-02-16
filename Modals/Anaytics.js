const files = require('../utils/files');
exports.analyticsModal = async () => {
	const logs = await files.get('log.json');
	if (!logs || !Object.entries(logs).length) return;

	return {
		type: 'modal',
		title: {
			type: 'plain_text',
			text: 'Analytics',
			emoji: true
		},

		close: {
			type: 'plain_text',
			text: 'Cancel',
			emoji: true
		},
		blocks: [
			{
				type: 'section',
				fields: Object.entries(logs).map(cur => ({
					type: 'mrkdwn',
					text: `*${cur[0]}*\n\`\`\`${cur[1]}\`\`\``
				}))
			}
		]
	};
};
