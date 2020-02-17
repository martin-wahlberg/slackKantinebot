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
const bolt_1 = __importDefault(require("../bolt"));
const Utils_1 = require("../Utils");
const WeekMenuList_1 = __importDefault(require("../Modals/WeekMenuList"));
const KantineMenyCommand_1 = require("./KantineMenyCommand");
console.log('👊 Actions loaded!');
bolt_1.default.action('show_menu', ({ ack, context }) => {
    ack();
    Utils_1.log('show_menu');
    WeekMenuList_1.default('').then(view => {
        Utils_1.openModal(context.trigger_id, view);
    });
});
bolt_1.default.command('/kantinemeny', ({ ack, payload }) => {
    ack();
    KantineMenyCommand_1.performKantinemenyAction(payload);
});
bolt_1.default.view('submit_menu', ({ ack, view }) => __awaiter(void 0, void 0, void 0, function* () {
    ack();
    Utils_1.writeMenusFromJSONForm(view.state);
}));
//# sourceMappingURL=index.js.map