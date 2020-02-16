const cron = require('node-cron');
const bolt = require('./bolt');
const utils = require('./utils/utils');

const DailyNotification = require('./Messages/DailyNotification');
const WeekMenuList = require('./Modals/WeekMenuList');
const UpdateMenu = require('./Modals/UpdateMenu');
const Analytics = require('./Modals/Anaytics');
const Users = require('./Modals/Users');

const openModal = (payload, context, view) => {
	try {
		bolt.app.client.views.open({
			token: process.env.SLACK_BOT_TOKEN,
			// Pass a valid trigger_id within 3 seconds of receiving it
			trigger_id: payload.trigger_id,
			// View payload
			view
		});
	} catch (error) {
		console.error(error);
	}
};

const performKantinemenyAction = async (payload, context) => {
	switch (true) {
		case !!payload.text.toLowerCase().match(/update/gi):
			if (!(await utils.checkIfUserExists(payload.user_name))) break;
			openModal(payload, context, UpdateMenu.getUpdateMenuModal());
			break;

		case !!payload.text.toLowerCase().match(/addUser/gi):
			if (!(await utils.checkIfUserExists(payload.user_name))) break;
			utils.addUser(payload.text);
			break;

		case !!payload.text.toLowerCase().match(/removeUser/gi):
			if (!utils.checkIfSuperAdmin(payload.user_name)) break;
			utils.removeUser(payload.text);
			break;

		case !!payload.text.toLowerCase().match(/removeAllUsers/gi):
			if (!utils.checkIfSuperAdmin(payload.user_name)) break;
			utils.removeAllUsers();
			break;

		case !!payload.text.toLowerCase().match(/analytics/gi):
			Analytics.analyticsModal().then(view => {
				if (!view) return;
				openModal(payload, context, view);
			});
			break;

		case !!payload.text.toLowerCase().match(/removeAllUsers/gi):
			if (!utils.checkIfSuperAdmin(payload.user_name)) break;
			utils.resetLogs();
			break;

		case !!payload.text.toLowerCase().match(/getUsers/gi):
			Users.usersModal()
				.then(view => {
					if (!view) return;
					openModal(payload, context, view);
				})
				.catch(e => {
					console.log(e);
				});
			break;

		default:
			WeekMenuList.getWeekMenuList(payload.text).then(view => {
				openModal(payload, context, view);
			});
			break;
	}
};

bolt.app.action('show_menu', ({ body, ack, say, context, payload }) => {
	ack();
	utils.log('show_menu');
	WeekMenuList.getWeekMenuList('').then(view => {
		openModal(body, context, view);
	});
});

bolt.app.command('/kantinemeny', ({ ack, payload, context }) => {
	ack();
	performKantinemenyAction(payload, context);
});

bolt.app.view('submit_menu', async ({ ack, view }) => {
	ack();
	utils.writeMenusFromJSONForm(view.state.values);
});

cron.schedule(
	'30 10 * * MON,TUE,WED,THU,FRI',
	() => {
		DailyNotification.getDailyNotification().then(message => {
			bolt.app.client.chat.postMessage({
				token: process.env.SLACK_BOT_TOKEN,
				channel: process.env.KANTINEMENY_CHANNEL_ID,
				...message
			});
		});
	},
	{
		scheduled: true,
		timezone: 'Europe/Stockholm'
	}
);
