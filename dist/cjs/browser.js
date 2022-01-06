"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES = exports.isGamepadSupported = exports.gameControl = void 0;
// This file is the entry point for browsers, this file set's the global window.gameControl object
__exportStar(require("./types"), exports);
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
