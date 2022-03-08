"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameControl = exports.MESSAGES = exports.isGamepadSupported = void 0;
// This file is the entry point for modules, use this if you do not want to set the global window.gameControl object
__exportStar(require("./types"), exports);
var tools_1 = require("./tools");
Object.defineProperty(exports, "isGamepadSupported", { enumerable: true, get: function () { return tools_1.isGamepadSupported; } });
var constants_1 = require("./constants");
Object.defineProperty(exports, "MESSAGES", { enumerable: true, get: function () { return constants_1.MESSAGES; } });
const gamecontrol_1 = require("./gamecontrol");
exports.gameControl = gamecontrol_1.default;
exports.default = gamecontrol_1.default;
