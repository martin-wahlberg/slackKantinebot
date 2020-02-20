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
const analyticsModal = () => __awaiter(void 0, void 0, void 0, function* () {
    const logs = yield db_1.getFromDb('log');
    if (!logs || !Object.entries(logs).length)
        return;
    const modal = {
        type: 'modal',
        title: {
            type: 'plain_text',
            text: 'Analytics',
            emoji: true
        },
        close: {
            type: 'plain_text',
            text: 'Cancel',
            emoji: true
        },
        blocks: [
            {
                type: 'section',
                fields: Object.entries(logs).map(cur => ({
                    type: 'mrkdwn',
                    text: `*${cur[0]}*\n\`\`\`${cur[1]}\`\`\``
                }))
            }
        ]
    };
    return modal;
});
exports.default = analyticsModal;
//# sourceMappingURL=Anaytics.js.map