import app from '../bolt';
import { log, writeMenusFromJSONForm, openModal } from '../Utils';
import getWeekMenuList from '../Modals/WeekMenuList';
import { performKantinemenyAction } from './KantineMenyCommand';

console.log('👊 Actions loaded!');

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
