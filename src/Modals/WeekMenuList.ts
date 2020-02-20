import { getFromDb } from '../Utils/db';
import { log, getRandomFoodEmoji, getWeekDayNumber } from '../Utils';
import { View } from '@slack/web-api';

const getWeekMenuText = (locationMenu?: Record<string, string>) =>
  locationMenu &&
  Object.entries(locationMenu)
    .sort((a, b) => getWeekDayNumber(a[0]) - getWeekDayNumber(b[0]))
    .reduce((acc, cur) => {
      const [key, value] = cur;
      return `${acc}\n\n*${key.charAt(0).toUpperCase() +
        key.substring(1)}*\n>${value
        .replace(/\n/g, ', ')
        .replace(/ ,/g, ',')
        .replace(/:,/g, ':')
        .trim()
        .replace(/,$/, '')}`;
    }, '');

const getBlocksForLocation = (
  locationName: string,
  locationMenu?: Record<string, string>
) => [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*Ukens meny på ${locationName}* ${getRandomFoodEmoji()}`
    }
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: getWeekMenuText(locationMenu) || 'Ingen meny :shrug:'
    }
  },
  {
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `/kantinemeny ${locationName.toLowerCase()}`
      }
    ]
  },
  {
    type: 'divider'
  }
];

const getWeekMenuList = async (selectedLocation: string) => {
  const meny = await getFromDb<weekMenuLocations>('meny');
  const huset = meny?.huset;
  const galleriet = meny?.galleriet;
  selectedLocation === 'huset'
    ? log('kantinemeny_huset')
    : selectedLocation === 'galleriet'
    ? log('kantinemeny_galleriet')
    : log('kantinemeny_all');
  const blocks =
    selectedLocation === 'huset'
      ? getBlocksForLocation('Huset', huset)
      : selectedLocation === 'galleriet'
      ? getBlocksForLocation('Galleriet', galleriet)
      : [
          ...getBlocksForLocation('Huset', huset),
          ...getBlocksForLocation('Galleriet', galleriet)
        ];

  const modal: View = {
    type: 'modal',
    title: {
      type: 'plain_text',
      text: `Ukesmeny`,
      emoji: true
    },
    close: {
      type: 'plain_text',
      text: 'Lukk',
      emoji: true
    },
    blocks
  };

  return modal;
};

export default getWeekMenuList;
