"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DailyNotification_1 = __importDefault(require("../Messages/DailyNotification"));
const bolt_1 = __importDefault(require("../bolt"));
const node_cron_1 = __importDefault(require("node-cron"));
const cronJobs = () => {
    console.log('⏰ CronJobs loaded!');
    //Daily lunch notification
    node_cron_1.default.schedule('30 10 * * MON,TUE,WED,THU,FRI', () => {
        DailyNotification_1.default().then(message => {
            if (message) {
                bolt_1.default.client.chat.postMessage(Object.assign({}, message));
            }
        });
    }, {
        scheduled: true,
        timezone: 'Europe/Stockholm'
    });
};
exports.default = cronJobs;
//# sourceMappingURL=index.js.map