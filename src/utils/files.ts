import fs from 'fs';
import { log } from './utils';

export const getFile = <T>(fileName: string) => {
	return new Promise<T | undefined>((resolve, reject) =>
		fs.readFile(fileName, 'utf-8', (err, data: string) => {
			if (err) {
				const errorMsg = `error_get_${fileName}`.replace('.', '_');
				log(errorMsg);
				reject(err);
			} else {
				try {
					resolve(JSON.parse(data));
				} catch (error) {
					resolve(undefined);
					const errorMsg = `error_parse_${fileName}`.replace('.', '_');
					log(errorMsg);
				}
			}
		})
	);
};

export const writeFile = (fileName: string, data: Object) =>
	fs.writeFile(fileName, JSON.stringify(data), err => {
		if (err) {
			const errorMsg = `error_write_${fileName}`.replace('.', '_');
			log(errorMsg);
			throw err;
		}
	});
