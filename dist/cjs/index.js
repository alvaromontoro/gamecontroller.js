"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameControl = exports.MESSAGES = exports.isGamepadSupported = void 0;
// This file is the entry point for modules, use this if you do not want to set the global window.gameControl object
var tools_1 = require("./tools");
Object.defineProperty(exports, "isGamepadSupported", { enumerable: true, get: function () { return tools_1.isGamepadSupported; } });
var constants_1 = require("./constants");
Object.defineProperty(exports, "MESSAGES", { enumerable: true, get: function () { return constants_1.MESSAGES; } });
const gamecontrol_1 = require("./gamecontrol");
exports.gameControl = gamecontrol_1.default;
exports.default = gamecontrol_1.default;
