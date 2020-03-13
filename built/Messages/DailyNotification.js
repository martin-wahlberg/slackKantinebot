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
const db_1 = require("../Utils/db");
const Utils_1 = require("../Utils");
const getDailyNotification = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const weeksMenu = yield db_1.getFromDb('meny');
    if (weeksMenu === null || weeksMenu === void 0 ? void 0 : weeksMenu.disabled)
        return null;
    const huset = (_a = weeksMenu === null || weeksMenu === void 0 ? void 0 : weeksMenu.huset) === null || _a === void 0 ? void 0 : _a[Utils_1.getWeekDay(moment_1.default().weekday())];
    const galleriet = (_b = weeksMenu === null || weeksMenu === void 0 ? void 0 : weeksMenu.galleriet) === null || _b === void 0 ? void 0 : _b[Utils_1.getWeekDay(moment_1.default().weekday())];
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