"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyEvents = exports.error = exports.log = exports.isGamepadSupported = void 0;
const log = (message, type = 'log') => {
    if (type === 'error') {
        if (console && typeof console.error === 'function')
            console.error(message);
    }
    else {
        if (console && typeof console.info === 'function')
            console.info(message);
    }
};
exports.log = log;
const error = (message) => log(message, 'error');
exports.error = error;
const isGamepadSupported = () => (navigator.getGamepads && (typeof navigator.getGamepads === 'function') ||
    (typeof navigator.webkitGetGamepads === 'function')) ||
    false;
exports.isGamepadSupported = isGamepadSupported;
const emptyEvents = () => ({ action: () => { }, after: () => { }, before: () => { } });
exports.emptyEvents = emptyEvents;
