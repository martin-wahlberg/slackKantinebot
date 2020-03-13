import {
  checkIfUserExists,
  removeAllUsers,
  removeUser,
  addUser,
  openModal,
  resetLogs,
  log
} from '../Utils';
import { SlashCommand } from '@slack/bolt';
import { checkIfSuperAdmin } from '../Utils';
import getWeekMenuList from '../Modals/WeekMenuList';
import getUpdateMenuModal from '../Modals/UpdateMenu';
import analyticsModal from '../Modals/Anaytics';
import usersModal from '../Modals/Users';
import { getFromDb } from '../Utils/db';
import { writeToDb } from '../Utils/db';

export const performKantinemenyAction = async (payload: SlashCommand) => {
  switch (true) {
    case !!payload.text.toLowerCase().match(/update/gi):
      log('update_menu');
      console.log(payload.user_name);
      if (!(await checkIfUserExists(payload.user_name))) break;
      openModal(payload.trigger_id, getUpdateMenuModal());
      break;

    case !!payload.text.toLowerCase().match(/toggleBot/gi):
      log('toggleBot');
      getFromDb<boolean>('meny/disabled').then(res =>
        writeToDb('meny/disabled', !res)
      );
      break;

    case !!payload.text.toLowerCase().match(/addUser/gi):
      log('add_user');
      if (!(await checkIfUserExists(payload.user_name))) break;
      addUser(payload.user_name, payload.text);
      break;

    case !!payload.text.toLowerCase().match(/removeUser/gi):
      log('remove_user');
      if (!checkIfSuperAdmin(payload.user_name)) break;
      removeUser(payload.text);
      break;

    case !!payload.text.toLowerCase().match(/removeAllUsers/gi):
      log('remove_all_users');
      if (!checkIfSuperAdmin(payload.user_name)) break;
      removeAllUsers();
      break;

    case !!payload.text.toLowerCase().match(/analytics/gi):
      log('analytics');
      analyticsModal().then(view => {
        if (!view) return;
        openModal(payload.trigger_id, view);
      });
      break;

    case !!payload.text.toLowerCase().match(/resetLogs/gi):
      log('reset_logs');
      if (!checkIfSuperAdmin(payload.user_name)) break;
      resetLogs();
      break;

    case !!payload.text.toLowerCase().match(/getUsers/gi):
      if (!checkIfSuperAdmin(payload.user_name)) break;
      log('get_users');
      usersModal().then(view => {
        if (!view) return;
        openModal(payload.trigger_id, view);
      });
      break;

    default:
      log('slash_command_menu');
      getWeekMenuList(payload.text).then(view => {
        openModal(payload.trigger_id, view);
      });
      break;
  }
};
