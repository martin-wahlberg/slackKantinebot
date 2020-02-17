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
const moment_1 = __importDefault(require("moment"));
const files_1 = require("../Utils/files");
const Utils_1 = require("../Utils");
const getWeekDay = (dayNumber) => {
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
const getDailyNotification = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const weeksMenu = yield files_1.getFile('meny.json');
    const huset = (_b = (_a = weeksMenu) === null || _a === void 0 ? void 0 : _a.huset) === null || _b === void 0 ? void 0 : _b[getWeekDay(moment_1.default().weekday())];
    const galleriet = (_d = (_c = weeksMenu) === null || _c === void 0 ? void 0 : _c.galleriet) === null || _d === void 0 ? void 0 : _d[getWeekDay(moment_1.default().weekday())];
    return {
        token: process.env.SLACK_BOT_TOKEN,
        channel: process.env.KANTINEMENY_CHANNEL_ID || '',
        text: `Det er straks tid for lunsj! ${Utils_1.getRandomFoodEmoji()}`,
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `Det er straks tid for lunsj! ${Utils_1.getRandomFoodEmoji()}`
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
});
exports.default = getDailyNotification;
//# sourceMappingURL=DailyNotification.js.map