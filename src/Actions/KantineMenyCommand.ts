import { checkIfUserExists, removeAllUsers, removeUser, addUser, openModal, resetLogs } from "../Utils";
import { SlashCommand } from "@slack/bolt";
import { checkIfSuperAdmin } from "../Utils";
import getWeekMenuList from "../Modals/WeekMenuList";
import getUpdateMenuModal from "../Modals/UpdateMenu";
import analyticsModal from "../Modals/Anaytics";
import usersModal from "../Modals/Users";


export const performKantinemenyAction = async (payload: SlashCommand) => {
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