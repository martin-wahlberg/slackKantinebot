const files = require('./files');

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

exports.getRandomFoodEmoji = () =>
	foodEmojis[Math.round(Math.random() * foodEmojis.length)] || ':sushi:';

const tryParseJSON = jsonString => {
	try {
		return JSON.parse(jsonString);
	} catch (error) {
		return undefined;
	}
};

exports.writeMenusFromJSONForm = formInput => {
	const valuesFromForm = Object.values(formInput).reduce(
		(acc, cur) => ({ ...acc, ...cur }),
		{}
	);
	const huset =
		tryParseJSON(valuesFromForm.huset.value.replace(/\n\\/g, '')) || {};
	const galleriet =
		tryParseJSON(valuesFromForm.galleriet.value.replace(/\n\\/g, '')) || {};

	files.write('meny.json', { huset, galleriet });
};

exports.checkIfUserExists = async userName => {
	const users = await files.get('users.json');
	console.log(userName);
	return (
		!!users.find(cur => cur.includes(userName)) ||
		!!userName.includes(process.env.SUPER_ADMIN)
	);
};

exports.checkIfSuperAdmin = userName =>
	!!userName.includes(process.env.SUPER_ADMIN);

exports.addUser = async userName => {
	const users = await files.get('users.json');
	files.write('users.json', [
		...users,
		userName.replace(/addUser/gi, '').trim()
	]);
};

exports.removeUser = async userName => {
	const users = await files.get('users.json');
	files.write(
		'users.json',
		users.reduce((acc, cur) => {
			if (!cur.includes(userName.replace(/removeUser/gi, '').trim()))
				return [...acc, cur];
			else return acc;
		}, [])
	);
};

exports.removeAllUsers = () => {
	files.write('users.json', []);
};

exports.log = async key => {
	const analytics = await files.get('log.json');
	if (analytics) {
		const keyCount = parseInt(analytics[key]) + 1 || 1;
		files.write('log.json', { ...analytics, [key]: keyCount });
	}
};

exports.resetLogs = () => {
	files.write('log.json', []);
};
