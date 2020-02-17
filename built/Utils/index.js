"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const files_1 = require("./files");
const bolt_1 = __importDefault(require("../bolt"));
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
exports.getRandomFoodEmoji = () => foodEmojis[Math.round(Math.random() * foodEmojis.length)] || ':sushi:';
const tryParseJSON = (jsonString) => {
    try {
        return JSON.parse(jsonString);
    }
    catch (error) {
        return undefined;
    }
};
exports.writeMenusFromJSONForm = (formInput) => {
    var _a, _b, _c, _d;
    const castedFormInput = formInput;
    const valuesFromForm = Object.values(castedFormInput.values).reduce((acc, cur) => (Object.assign(Object.assign({}, acc), cur)), {});
    const huset = (((_b = (_a = valuesFromForm) === null || _a === void 0 ? void 0 : _a.huset) === null || _b === void 0 ? void 0 : _b.value) &&
        tryParseJSON(valuesFromForm.huset.value.replace(/\n\\/g, ''))) ||
        {};
    const galleriet = (((_d = (_c = valuesFromForm) === null || _c === void 0 ? void 0 : _c.galleriet) === null || _d === void 0 ? void 0 : _d.value) &&
        tryParseJSON(valuesFromForm.galleriet.value.replace(/\n\\/g, ''))) ||
        {};
    files_1.writeFile('meny.json', {
        huset,
        galleriet
    });
};
exports.checkIfUserExists = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const users = yield files_1.getFile('users.json');
    return (!!((_a = users) === null || _a === void 0 ? void 0 : _a.find((cur) => cur.includes(userName))) ||
        (process.env.SUPER_ADMIN && !!userName.includes(process.env.SUPER_ADMIN)));
});
exports.checkIfSuperAdmin = (userName) => process.env.SUPER_ADMIN && !!userName.includes(process.env.SUPER_ADMIN);
exports.addUser = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield files_1.getFile('users.json');
    if (users) {
        files_1.writeFile('users.json', [
            ...users,
            userName.replace(/addUser/gi, '').trim()
        ]);
    }
});
exports.removeUser = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield files_1.getFile('users.json');
    if (users) {
        files_1.writeFile('users.json', users.reduce((acc, cur) => {
            if (!cur.includes(userName.replace(/removeUser/gi, '').trim()))
                return [...acc, cur];
            else
                return acc;
        }, []));
    }
});
exports.removeAllUsers = () => {
    files_1.writeFile('users.json', []);
};
exports.log = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const analytics = yield files_1.getFile('log.json');
    if (analytics) {
        const keyCount = analytics[key] + 1 || 1;
        files_1.writeFile('log.json', Object.assign(Object.assign({}, analytics), { [key]: keyCount }));
    }
});
exports.resetLogs = () => {
    files_1.writeFile('log.json', []);
};
exports.openModal = (trigger_id, view) => {
    try {
        bolt_1.default.client.views.open({
            token: process.env.SLACK_BOT_TOKEN,
            // Pass a valid trigger_id within 3 seconds of receiving it
            trigger_id: trigger_id,
            // View payload
            view
        });
    }
    catch (error) {
        console.error(error);
    }
};
//# sourceMappingURL=index.js.map