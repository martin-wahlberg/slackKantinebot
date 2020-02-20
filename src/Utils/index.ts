import { writeToDb, getFromDb } from './db';
import { View } from '@slack/web-api';

import app from '../bolt';

const foodEmojis = [
  ':pizza:',
  ':sandwich:',
  ':taco:',
  ':hotdog:',
  ':fries:',
  ':hamburger:',
  ':doughnut:',
  ':bento:',
  ':rice:',
  ':fried_egg:',
  ':burrito:',
  ':ramen:'
];

export const getRandomFoodEmoji = () =>
  foodEmojis[Math.round(Math.random() * foodEmojis.length)] || ':sushi:';

const tryParseJSON = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return undefined;
  }
};

export const writeMenusFromJSONForm = (formInput: Object) => {
  const castedFormInput = formInput as JSONInputState;
  const valuesFromForm: mappedJSONInput = Object.values(
    castedFormInput.values
  ).reduce(
    (acc, cur) => ({
      ...acc,
      ...cur
    }),
    {}
  );

  const huset =
    (valuesFromForm?.huset?.value &&
      tryParseJSON(valuesFromForm.huset.value.replace(/\n\\/g, ''))) ||
    {};
  const galleriet =
    (valuesFromForm?.galleriet?.value &&
      tryParseJSON(valuesFromForm.galleriet.value.replace(/\n\\/g, ''))) ||
    {};

  writeToDb('meny', {
    huset,
    galleriet
  });
};

export const checkIfUserExists = async (userName: string) => {
  const users = await getFromDb<string[]>('users');
  return (
    !!users?.find((cur: string) => cur.includes(userName)) ||
    (process.env.SUPER_ADMIN && !!userName.includes(process.env.SUPER_ADMIN))
  );
};

export const checkIfSuperAdmin = (userName: string) =>
  process.env.SUPER_ADMIN && !!userName.includes(process.env.SUPER_ADMIN);

export const addUser = async (userName: string) => {
  const users = await getFromDb<string[]>('users');
  writeToDb('users', [
    ...(users || []),
    userName.replace(/addUser/gi, '').trim()
  ]);
};

export const removeUser = async (userName: string) => {
  const formattedUserName = userName.replace(/removeUser/gi, '').trim();
  if (formattedUserName) {
    const users = await getFromDb<string[]>('users');
    if (users) {
      writeToDb(
        'users',
        users.reduce((acc: string[], cur: string) => {
          if (!cur.includes(formattedUserName)) return [...acc, cur];
          else return acc;
        }, [])
      );
    }
  }
};

export const removeAllUsers = () => {
  writeToDb('users', {});
};

let logging = false;
export const log = async (key: string) => {
  if (logging) {
    setTimeout(() => {
      log(key);
    }, 100);
  } else {
    logging = true;
    const analytics = await getFromDb<{ [k: string]: number }>('log');
    const keyCount = analytics && analytics[key] ? analytics[key] + 1 : 1;
    writeToDb('log', { ...analytics, [key]: keyCount }).finally(() => {
      logging = false;
    });
  }
};

export const resetLogs = () => {
  writeToDb('log', {});
};

export const openModal = (trigger_id: string, view: View) => {
  try {
    app.client.views
      .open({
        token: process.env.SLACK_BOT_TOKEN,
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: trigger_id,
        // View payload
        view
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    console.error(error);
  }
};

export const getWeekDay = (dayNumber: number): string => {
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

export const getWeekDayNumber = (day: string): number => {
  switch (day) {
    case 'mandag':
      return 1;
    case 'tirsdag':
      return 2;
    case 'onsdag':
      return 3;
    case 'torsdag':
      return 4;
    case 'fredag':
      return 5;
    case 'lørdag':
      return 6;
    case 'søndag':
      return 7;
    default:
      return 8;
  }
};
