"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var utils_1 = require("./utils");
exports.getFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        return fs_1.default.readFile(fileName, 'utf-8', function (err, data) {
            if (err) {
                var errorMsg = ("error_get_" + fileName).replace('.', '_');
                utils_1.log(errorMsg);
                reject(err);
            }
            else {
                try {
                    resolve(JSON.parse(data));
                }
                catch (error) {
                    resolve(undefined);
                    var errorMsg = ("error_parse_" + fileName).replace('.', '_');
                    utils_1.log(errorMsg);
                }
            }
        });
    });
};
exports.writeFile = function (fileName, data) {
    return fs_1.default.writeFile(fileName, JSON.stringify(data), function (err) {
        if (err) {
            var errorMsg = ("error_write_" + fileName).replace('.', '_');
            utils_1.log(errorMsg);
            throw err;
        }
    });
};
//# sourceMappingURL=files.js.map