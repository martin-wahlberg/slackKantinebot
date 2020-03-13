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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../Utils/db");
const Utils_1 = require("../Utils");
const getWeekMenuText = (locationMenu) => locationMenu &&
    Object.entries(locationMenu)
        .sort((a, b) => Utils_1.getWeekDayNumber(a[0]) - Utils_1.getWeekDayNumber(b[0]))
        .reduce((acc, cur) => {
        const [key, value] = cur;
        return `${acc}\n\n*${key.charAt(0).toUpperCase() +
            key.substring(1)}*\n>${value
            .replace(/\n/g, ', ')
            .replace(/ ,/g, ',')
            .replace(/:,/g, ':')
            .trim()
            .replace(/,$/, '')}`;
    }, '');
const getBlocksForLocation = (locationName, locationMenu) => [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `*Ukens meny på ${locationName}* ${Utils_1.getRandomFoodEmoji()}`
        }
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: getWeekMenuText(locationMenu) || 'Ingen meny :shrug:'
        }
    },
    {
        type: 'context',
        elements: [
            {
                type: 'mrkdwn',
                text: `/kantinemeny ${locationName.toLowerCase()}`
            }
        ]
    },
    {
        type: 'divider'
    }
];
const getWeekMenuList = (selectedLocation) => __awaiter(void 0, void 0, void 0, function* () {
    const meny = yield db_1.getFromDb('meny');
    const huset = meny === null || meny === void 0 ? void 0 : meny.huset;
    const galleriet = meny === null || meny === void 0 ? void 0 : meny.galleriet;
    selectedLocation === 'huset'
        ? Utils_1.log('kantinemeny_huset')
        : selectedLocation === 'galleriet'
            ? Utils_1.log('kantinemeny_galleriet')
            : Utils_1.log('kantinemeny_all');
    const blocks = selectedLocation === 'huset'
        ? getBlocksForLocation('Huset', huset)
        : selectedLocation === 'galleriet'
            ? getBlocksForLocation('Galleriet', galleriet)
            : [
                ...getBlocksForLocation('Huset', huset),
                ...getBlocksForLocation('Galleriet', galleriet)
            ];
    const modal = {
        type: 'modal',
        title: {
            type: 'plain_text',
            text: `Ukesmeny`,
            emoji: true
        },
        close: {
            type: 'plain_text',
            text: 'Lukk',
            emoji: true
        },
        blocks
    };
    return modal;
});
exports.default = getWeekMenuList;
//# sourceMappingURL=WeekMenuList.js.map