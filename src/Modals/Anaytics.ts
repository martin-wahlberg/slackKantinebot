import { getFile } from '../utils/files';
import { View } from '@slack/web-api';

const analyticsModal = async () => {
	const logs = await getFile<[[string, string]]>('log.json');
	if (!logs || !Object.entries(logs).length) return;

	const modal: View = {
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
	return modal;
};

export default analyticsModal;
