"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES = exports.isGamepadSupported = exports.gameControl = void 0;
// This file is the entry point
const tools_1 = require("./tools");
Object.defineProperty(exports, "isGamepadSupported", { enumerable: true, get: function () { return tools_1.isGamepadSupported; } });
const constants_1 = require("./constants");
Object.defineProperty(exports, "MESSAGES", { enumerable: true, get: function () { return constants_1.MESSAGES; } });
const gamecontrol_1 = require("./gamecontrol");
exports.gameControl = gamecontrol_1.default;
if ((0, tools_1.isGamepadSupported)()) {
    window.gameControl = gamecontrol_1.default;
}
else {
    (0, tools_1.error)(constants_1.MESSAGES.NO_SUPPORT);
}
exports.default = gamecontrol_1.default;
