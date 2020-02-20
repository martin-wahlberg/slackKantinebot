import moment from 'moment';

import { getFromDb } from '../Utils/db';
import { getRandomFoodEmoji } from '../Utils';
import { ChatPostMessageArguments } from '@slack/web-api';

const getWeekDay = (dayNumber: number): string => {
  switch (dayNumber) {
    case 0:
      return 'søndag';
    case 1:
      return 'mandag';
    case 2:
      return 'tirsdag';
    case 3:
      return 'onsdag';
    case 4:
      return 'torsdag';
    case 5:
      return 'fredag';
    case 6:
      return 'lørdag';
    case 7:
      return 'søndag';
    default:
      return 'ikkeEnDag';
  }
};

const getDailyNotification = async (): Promise<ChatPostMessageArguments> => {
  const weeksMenu = await getFromDb<weekMenuLocations>('meny');

  const huset = weeksMenu?.huset?.[getWeekDay(moment().weekday())];
  const galleriet = weeksMenu?.galleriet?.[getWeekDay(moment().weekday())];

  return {
    token: process.env.SLACK_BOT_TOKEN,
    channel: process.env.KANTINEMENY_CHANNEL_ID || '',
    text: `Det er straks tid for lunsj! ${getRandomFoodEmoji()}`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Det er straks tid for lunsj! ${getRandomFoodEmoji()}`
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Se ukesmeny',
            emoji: true
          },
          action_id: 'show_menu'
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Dagens meny på Huset:*\n ${huset || 'Ingen meny :shrug:'}`
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Dagens meny på Galleriet:*\n ${galleriet ||
            'Ingen meny :shrug:'}`
        }
      }
    ]
  };
};

export default getDailyNotification;
