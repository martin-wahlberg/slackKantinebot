import { View } from '@slack/web-api';

const getUpdateMenuModal = () => {
	const modal: View = {
		type: 'modal',
		callback_id: 'submit_menu',
		title: {
			type: 'plain_text',
			text: 'Oppdater ukesmenyen',
			emoji: true
		},
		submit: {
			type: 'plain_text',
			text: 'Oppdater meny',
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
				text: {
					type: 'mrkdwn',
					text:
						'*JSON format:*\n```{\n"mandag":"Kjøtt\\nSuppe\\n",\n"tirsdag":"Pølse\\nSalat\\n",\n"onsdag":"Reinsdyr\\nLapskaus\\n",\n"torsdag":"Fisk\\nBoboli\\n",\n"fredag":"Taco\\nQuesedilla\\n"\n}```'
				}
			},
			{
				type: 'context',
				elements: [
					{
						type: 'mrkdwn',
						text:
							'Alle retter må avsluttes med: \\n\nDette for å sikre riktig formatering'
					}
				]
			},
			{
				type: 'input',
				element: {
					type: 'plain_text_input',
					action_id: 'huset',
					multiline: true,
					placeholder: {
						type: 'plain_text',
						text: 'Insert JSON'
					}
				},
				label: {
					type: 'plain_text',
					text: 'Meny huset'
				},
				hint: {
					type: 'plain_text',
					text: 'Insert JSON'
				}
			},
			{
				type: 'input',
				element: {
					type: 'plain_text_input',
					action_id: 'galleriet',
					multiline: true,
					placeholder: {
						type: 'plain_text',
						text: 'Insert JSON'
					}
				},
				label: {
					type: 'plain_text',
					text: 'Meny galleriet'
				},
				hint: {
					type: 'plain_text',
					text: 'Insert JSON'
				}
			}
		]
	};
	return modal;
};

export default getUpdateMenuModal;
