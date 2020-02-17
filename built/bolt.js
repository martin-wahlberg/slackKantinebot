"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bolt_1 = require("@slack/bolt");
var app = new bolt_1.App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});
exports.default = app;
//# sourceMappingURL=bolt.js.map