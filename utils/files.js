var fs = require('fs');
const utils = require('./utils');

exports.get = fileName => {
	return new Promise((resolve, reject) =>
		fs.readFile(fileName, 'utf-8', (err, data) => {
			if (err) {
				const errorMsg = `error_get_${fileName}`.replace('.', '_');
				utils.log(errorMsg);
				reject(err);
			} else {
				try {
					resolve(JSON.parse(data));
				} catch (error) {
					resolve(undefined);
					const errorMsg = `error_parse_${fileName}`.replace('.', '_');
					utils.log(errorMsg);
				}
			}
		})
	);
};

exports.write = (fileName, data) =>
	fs.writeFile(fileName, JSON.stringify(data), err => {
		if (err) {
			const errorMsg = `error_write_${fileName}`.replace('.', '_');
			utils.log(errorMsg);
			throw err;
		}
	});
