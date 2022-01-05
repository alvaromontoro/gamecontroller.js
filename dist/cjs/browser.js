"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This file is the entry point
const tools_1 = require("./tools");
const constants_1 = require("./constants");
const gamecontrol_1 = require("./gamecontrol");
if ((0, tools_1.isGamepadSupported)()) {
    window.gameControl = gamecontrol_1.default;
}
else {
    (0, tools_1.error)(constants_1.MESSAGES.NO_SUPPORT);
}
