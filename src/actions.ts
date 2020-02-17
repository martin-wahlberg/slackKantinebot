import app from './bolt';
import cron from 'node-cron';
import {
	log,
	resetLogs,
	removeAllUsers,
	removeUser,
	addUser,
	checkIfSuperAdmin,
	checkIfUserExists,
	writeMenusFromJSONForm
} from './utils/utils';

import getDailyNotification from './Messages/DailyNotification';
import getWeekMenuList from './Modals/WeekMenuList';
import getUpdateMenuModal from './Modals/UpdateMenu';
import analyticsModal from './Modals/Anaytics';
import usersModal from './Modals/Users';
import { SlashCommand } from '@slack/bolt/dist/types/command';
import { View } from '@slack/web-api';

const openModal = (trigger_id: string, view: View) => {
	try {
		app.client.views.open({
			token: process.env.SLACK_BOT_TOKEN,
			// Pass a valid trigger_id within 3 seconds of receiving it
			trigger_id: trigger_id,
			// View payload
			view
		});
	} catch (error) {
		console.error(error);
	}
};

const performKantinemenyAction = async (payload: SlashCommand) => {
	switch (true) {
		case !!payload.text.toLowerCase().match(/update/gi):
			if (!(await checkIfUserExists(payload.user_name))) break;
			openModal(payload.trigger_id, getUpdateMenuModal());
			break;

		case !!payload.text.toLowerCase().match(/addUser/gi):
			if (!(await checkIfUserExists(payload.user_name))) break;
			addUser(payload.text);
			break;

		case !!payload.text.toLowerCase().match(/removeUser/gi):
			if (!checkIfSuperAdmin(payload.user_name)) break;
			removeUser(payload.text);
			break;

		case !!payload.text.toLowerCase().match(/removeAllUsers/gi):
			if (!checkIfSuperAdmin(payload.user_name)) break;
			removeAllUsers();
			break;

		case !!payload.text.toLowerCase().match(/analytics/gi):
			analyticsModal().then(view => {
				if (!view) return;
				openModal(payload.trigger_id, view);
			});
			break;

		case !!payload.text.toLowerCase().match(/resetLogs/gi):
			if (!checkIfSuperAdmin(payload.user_name)) break;
			resetLogs();
			break;

		case !!payload.text.toLowerCase().match(/getUsers/gi):
			usersModal().then(view => {
				if (!view) return;
				openModal(payload.trigger_id, view);
			});
			break;

		default:
			getWeekMenuList(payload.text).then(view => {
				openModal(payload.trigger_id, view);
			});
			break;
	}
};

app.action('show_menu', ({ ack, context }) => {
	ack();
	log('show_menu');

	getWeekMenuList('').then(view => {
		openModal(context.trigger_id, view);
	});
});

app.command('/kantinemeny', ({ ack, payload }) => {
	ack();
	performKantinemenyAction(payload);
});

app.view('submit_menu', async ({ ack, view }) => {
	ack();
	writeMenusFromJSONForm(view.state);
});

cron.schedule(
	'30 10 * * MON,TUE,WED,THU,FRI',
	() => {
		getDailyNotification().then(message => {
			app.client.chat.postMessage({
				...message
			});
		});
	},
	{
		scheduled: true,
		timezone: 'Europe/Stockholm'
	}
);
