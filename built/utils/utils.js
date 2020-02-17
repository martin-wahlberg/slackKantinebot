"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var files_1 = require("./files");
var foodEmojis = [
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
exports.getRandomFoodEmoji = function () {
    return foodEmojis[Math.round(Math.random() * foodEmojis.length)] || ':sushi:';
};
var tryParseJSON = function (jsonString) {
    try {
        return JSON.parse(jsonString);
    }
    catch (error) {
        return undefined;
    }
};
exports.writeMenusFromJSONForm = function (formInput) {
    var _a, _b, _c, _d;
    var castedFormInput = formInput;
    var valuesFromForm = Object.values(castedFormInput.values).reduce(function (acc, cur) { return (__assign(__assign({}, acc), cur)); }, {});
    var huset = (((_b = (_a = valuesFromForm) === null || _a === void 0 ? void 0 : _a.huset) === null || _b === void 0 ? void 0 : _b.value) &&
        tryParseJSON(valuesFromForm.huset.value.replace(/\n\\/g, ''))) ||
        {};
    var galleriet = (((_d = (_c = valuesFromForm) === null || _c === void 0 ? void 0 : _c.galleriet) === null || _d === void 0 ? void 0 : _d.value) &&
        tryParseJSON(valuesFromForm.galleriet.value.replace(/\n\\/g, ''))) ||
        {};
    files_1.writeFile('meny.json', {
        huset: huset,
        galleriet: galleriet
    });
};
exports.checkIfUserExists = function (userName) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, files_1.getFile('users.json')];
            case 1:
                users = _b.sent();
                return [2 /*return*/, (!!((_a = users) === null || _a === void 0 ? void 0 : _a.find(function (cur) { return cur.includes(userName); })) ||
                        (process.env.SUPER_ADMIN && !!userName.includes(process.env.SUPER_ADMIN)))];
        }
    });
}); };
exports.checkIfSuperAdmin = function (userName) {
    return process.env.SUPER_ADMIN && !!userName.includes(process.env.SUPER_ADMIN);
};
exports.addUser = function (userName) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, files_1.getFile('users.json')];
            case 1:
                users = _a.sent();
                if (users) {
                    files_1.writeFile('users.json', __spreadArrays(users, [
                        userName.replace(/addUser/gi, '').trim()
                    ]));
                }
                return [2 /*return*/];
        }
    });
}); };
exports.removeUser = function (userName) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, files_1.getFile('users.json')];
            case 1:
                users = _a.sent();
                if (users) {
                    files_1.writeFile('users.json', users.reduce(function (acc, cur) {
                        if (!cur.includes(userName.replace(/removeUser/gi, '').trim()))
                            return __spreadArrays(acc, [cur]);
                        else
                            return acc;
                    }, []));
                }
                return [2 /*return*/];
        }
    });
}); };
exports.removeAllUsers = function () {
    files_1.writeFile('users.json', []);
};
exports.log = function (key) { return __awaiter(void 0, void 0, void 0, function () {
    var analytics, keyCount;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, files_1.getFile('log.json')];
            case 1:
                analytics = _b.sent();
                if (analytics) {
                    keyCount = analytics[key] + 1 || 1;
                    files_1.writeFile('log.json', __assign(__assign({}, analytics), (_a = {}, _a[key] = keyCount, _a)));
                }
                return [2 /*return*/];
        }
    });
}); };
exports.resetLogs = function () {
    files_1.writeFile('log.json', []);
};
//# sourceMappingURL=utils.js.map