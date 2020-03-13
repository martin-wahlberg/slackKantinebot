import moment from 'moment';

import { getFromDb } from '../Utils/db';
import { getRandomFoodEmoji, getWeekDay } from '../Utils';
import { ChatPostMessageArguments } from '@slack/web-api';

const getDailyNotification = async (): Promise<ChatPostMessageArguments | null> => {
  const weeksMenu = await getFromDb<weekMenuLocations>('meny');

  if (weeksMenu?.disabled) return null;

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
