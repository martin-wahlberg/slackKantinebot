"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const _1 = require(".");
exports.getFile = (fileName) => {
    return new Promise((resolve, reject) => fs_1.default.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
            const errorMsg = `error_get_${fileName}`.replace('.', '_');
            _1.log(errorMsg);
            reject(err);
        }
        else {
            try {
                resolve(JSON.parse(data));
            }
            catch (error) {
                resolve(undefined);
                const errorMsg = `error_parse_${fileName}`.replace('.', '_');
                _1.log(errorMsg);
            }
        }
    }));
};
exports.writeFile = (fileName, data) => fs_1.default.writeFile(fileName, JSON.stringify(data), err => {
    if (err) {
        const errorMsg = `error_write_${fileName}`.replace('.', '_');
        _1.log(errorMsg);
        throw err;
    }
});
//# sourceMappingURL=files.js.map