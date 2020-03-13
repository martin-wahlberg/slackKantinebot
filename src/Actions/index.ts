import app from '../bolt';
import { log, writeMenusFromJSONForm, openModal } from '../Utils';
import getWeekMenuList from '../Modals/WeekMenuList';
import { performKantinemenyAction } from './KantineMenyCommand';

const actions = () => {
  console.log('👊 Actions loaded!');

  app.action('show_menu', ({ ack, body }) => {
    ack();
    getWeekMenuList(' ').then(view => {
      //body.trigger_id finnes på objektet men ikke i typen
      //@ts-ignore
      const { trigger_id } = body;

      openModal(trigger_id, view);
    });
    log('show_menu_button');
  });

  app.command('/kantinemeny', ({ ack, payload }) => {
    ack();
    performKantinemenyAction(payload);
  });

  app.view('submit_menu', async ({ ack, view }) => {
    ack();
    log('submit_menu');
    writeMenusFromJSONForm(view.state);
  });
};

export default actions;
