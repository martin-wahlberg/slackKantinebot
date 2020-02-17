import { writeFile, getFile } from './files';

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

interface valueString {
	value: string;
}

interface HusetInputElement {
	huset: valueString;
}
interface GallerietInputElement {
	galleriet: valueString;
}

export interface JSONInputState {
	values: Record<string, HusetInputElement | GallerietInputElement>;
}

interface mappedJSONInput {
	huset?: valueString;
	galleriet?: valueString;
}

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

	writeFile('meny.json', {
		huset,
		galleriet
	});
};

export const checkIfUserExists = async (userName: string) => {
	const users = await getFile<string[]>('users.json');
	return (
		!!users?.find((cur: string) => cur.includes(userName)) ||
		(process.env.SUPER_ADMIN && !!userName.includes(process.env.SUPER_ADMIN))
	);
};

export const checkIfSuperAdmin = (userName: string) =>
	process.env.SUPER_ADMIN && !!userName.includes(process.env.SUPER_ADMIN);

export const addUser = async (userName: string) => {
	const users = await getFile<string[]>('users.json');
	if (users) {
		writeFile('users.json', [
			...users,
			userName.replace(/addUser/gi, '').trim()
		]);
	}
};
export const removeUser = async (userName: string) => {
	const users = await getFile<string[]>('users.json');
	if (users) {
		writeFile(
			'users.json',
			users.reduce((acc: string[], cur: string) => {
				if (!cur.includes(userName.replace(/removeUser/gi, '').trim()))
					return [...acc, cur];
				else return acc;
			}, [])
		);
	}
};

export const removeAllUsers = () => {
	writeFile('users.json', []);
};

export const log = async (key: string) => {
	const analytics = await getFile<{ [k: string]: number }>('log.json');
	if (analytics) {
		const keyCount = analytics[key] + 1 || 1;
		writeFile('log.json', { ...analytics, [key]: keyCount });
	}
};

export const resetLogs = () => {
	writeFile('log.json', []);
};
