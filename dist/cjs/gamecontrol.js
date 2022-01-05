"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("./tools");
const constants_1 = require("./constants");
const gamepad_1 = require("./gamepad");
const gameControl = {
    gamepads: {},
    axeThreshold: [1.0],
    isReady: (0, tools_1.isGamepadSupported)(),
    onConnect: function (_gamepad) { },
    onDisconnect: function (_index) { },
    onBeforeCycle: function () { },
    onAfterCycle: function () { },
    getGamepads: function () {
        return this.gamepads;
    },
    getGamepad: function (id) {
        if (this.gamepads[id]) {
            return this.gamepads[id];
        }
        return null;
    },
    set: function (property, value) {
        const properties = ['axeThreshold'];
        if (properties.indexOf(property) >= 0) {
            if (property === 'axeThreshold' && (!parseFloat(value) || value < 0.0 || value > 1.0)) {
                (0, tools_1.error)(constants_1.MESSAGES.INVALID_VALUE_NUMBER);
                return;
            }
            this[property] = value;
            if (property === 'axeThreshold') {
                const gps = this.getGamepads();
                const ids = Object.keys(gps);
                for (let x = 0; x < ids.length; x++) {
                    gps[ids[x]].set('axeThreshold', this.axeThreshold);
                }
            }
        }
        else {
            (0, tools_1.error)(constants_1.MESSAGES.INVALID_PROPERTY);
        }
    },
    checkStatus: function () {
        const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        const gamepadIds = Object.keys(gameControl.gamepads);
        gameControl.onBeforeCycle();
        for (let x = 0; x < gamepadIds.length; x++) {
            gameControl.gamepads[gamepadIds[x]].checkStatus();
        }
        gameControl.onAfterCycle();
        if (gamepadIds.length > 0) {
            requestAnimationFrame(gameControl.checkStatus);
        }
    },
    init: function () {
        window.addEventListener('gamepadconnected', e => {
            const egp = e.gamepad || e.detail.gamepad;
            (0, tools_1.log)(constants_1.MESSAGES.ON);
            if (!window.gamepads)
                window.gamepads = {};
            if (egp) {
                if (!window.gamepads[egp.index]) {
                    window.gamepads[egp.index] = egp;
                    const gp = gamepad_1.default.init(egp);
                    gp.set('axeThreshold', this.axeThreshold);
                    this.gamepads[gp.id] = gp;
                    this.onConnect(this.gamepads[gp.id]);
                }
                if (Object.keys(this.gamepads).length === 1)
                    this.checkStatus();
            }
        });
        window.addEventListener('gamepaddisconnected', e => {
            const egp = e.gamepad || e.detail.gamepad;
            (0, tools_1.log)(constants_1.MESSAGES.OFF);
            if (egp) {
                delete window.gamepads[egp.index];
                delete this.gamepads[egp.index];
                this.onDisconnect(egp.index);
            }
        });
    },
    on: function (eventName, callback) {
        switch (eventName) {
            case 'connect':
                this.onConnect = callback;
                break;
            case 'disconnect':
                this.onDisconnect = callback;
                break;
            case 'beforeCycle':
            case 'beforecycle':
                this.onBeforeCycle = callback;
                break;
            case 'afterCycle':
            case 'aftercycle':
                this.onAfterCycle = callback;
                break;
            default:
                (0, tools_1.error)(constants_1.MESSAGES.UNKNOWN_EVENT);
                break;
        }
        return this;
    },
    off: function (eventName) {
        switch (eventName) {
            case 'connect':
                this.onConnect = function (_gamepad) { };
                break;
            case 'disconnect':
                this.onDisconnect = function (_index) { };
                break;
            case 'beforeCycle':
            case 'beforecycle':
                this.onBeforeCycle = function () { };
                break;
            case 'afterCycle':
            case 'aftercycle':
                this.onAfterCycle = function () { };
                break;
            default:
                (0, tools_1.error)(constants_1.MESSAGES.UNKNOWN_EVENT);
                break;
        }
        return this;
    }
};
gameControl.init();
exports.default = gameControl;
