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
const Utils_1 = require("../Utils");
const Utils_2 = require("../Utils");
const WeekMenuList_1 = __importDefault(require("../Modals/WeekMenuList"));
const UpdateMenu_1 = __importDefault(require("../Modals/UpdateMenu"));
const Anaytics_1 = __importDefault(require("../Modals/Anaytics"));
const Users_1 = __importDefault(require("../Modals/Users"));
exports.performKantinemenyAction = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    switch (true) {
        case !!payload.text.toLowerCase().match(/update/gi):
            console.log(payload.user_name);
            if (!(yield Utils_1.checkIfUserExists(payload.user_name)))
                break;
            Utils_1.openModal(payload.trigger_id, UpdateMenu_1.default());
            break;
        case !!payload.text.toLowerCase().match(/addUser/gi):
            if (!(yield Utils_1.checkIfUserExists(payload.user_name)))
                break;
            Utils_1.addUser(payload.text);
            break;
        case !!payload.text.toLowerCase().match(/removeUser/gi):
            if (!Utils_2.checkIfSuperAdmin(payload.user_name))
                break;
            Utils_1.removeUser(payload.text);
            break;
        case !!payload.text.toLowerCase().match(/removeAllUsers/gi):
            if (!Utils_2.checkIfSuperAdmin(payload.user_name))
                break;
            Utils_1.removeAllUsers();
            break;
        case !!payload.text.toLowerCase().match(/analytics/gi):
            Anaytics_1.default().then(view => {
                if (!view)
                    return;
                Utils_1.openModal(payload.trigger_id, view);
            });
            break;
        case !!payload.text.toLowerCase().match(/resetLogs/gi):
            if (!Utils_2.checkIfSuperAdmin(payload.user_name))
                break;
            Utils_1.resetLogs();
            break;
        case !!payload.text.toLowerCase().match(/getUsers/gi):
            Users_1.default().then(view => {
                if (!view)
                    return;
                Utils_1.openModal(payload.trigger_id, view);
            });
            break;
        default:
            WeekMenuList_1.default(payload.text).then(view => {
                Utils_1.openModal(payload.trigger_id, view);
            });
            break;
    }
});
//# sourceMappingURL=KantineMenyCommand.js.map