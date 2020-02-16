const files = require('../utils/files');
exports.usersModal = async () => {
	const users = await files.get('users.json');
	if (!users && !users.length) return;

	return {
		type: 'modal',
		title: {
			type: 'plain_text',
			text: 'Users',
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
				fields: users.map(cur => ({
					type: 'mrkdwn',
					text: `*Username:*\n\`\`\`${cur}\`\`\``
				}))
			}
		]
	};
};
