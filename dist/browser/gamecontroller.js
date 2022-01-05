/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/browser.ts":
/*!************************!*\
  !*** ./src/browser.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ \"./src/tools.ts\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\n/* harmony import */ var _gamecontrol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gamecontrol */ \"./src/gamecontrol.ts\");\n// This file is the entry point\n\n\n\n\nif ((0,_tools__WEBPACK_IMPORTED_MODULE_0__.isGamepadSupported)()) {\n  window.gameControl = _gamecontrol__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n} else {\n  (0,_tools__WEBPACK_IMPORTED_MODULE_0__.error)(_constants__WEBPACK_IMPORTED_MODULE_1__.MESSAGES.NO_SUPPORT);\n}\n\n//# sourceURL=webpack://gamecontroller.js/./src/browser.ts?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MESSAGES\": () => (/* binding */ MESSAGES)\n/* harmony export */ });\nvar MESSAGES = {\n  ON: 'Gamepad detected.',\n  OFF: 'Gamepad disconnected.',\n  INVALID_PROPERTY: 'Invalid property.',\n  INVALID_VALUE_NUMBER: 'Invalid value. It must be a number between 0.00 and 1.00.',\n  INVALID_BUTTON: 'Button does not exist.',\n  UNKNOWN_EVENT: 'Unknown event name.',\n  NO_SUPPORT: 'Your web browser does not support the Gamepad API.'\n};\n\n\n//# sourceURL=webpack://gamecontroller.js/./src/constants.ts?");

/***/ }),

/***/ "./src/gamecontrol.ts":
/*!****************************!*\
  !*** ./src/gamecontrol.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ \"./src/tools.ts\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\n/* harmony import */ var _gamepad__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gamepad */ \"./src/gamepad.ts\");\n\n\n\nvar gameControl = {\n  gamepads: {},\n  axeThreshold: [1.0],\n  // this is an array so it can be expanded without breaking in the future\n  isReady: (0,_tools__WEBPACK_IMPORTED_MODULE_0__.isGamepadSupported)(),\n  onConnect: function onConnect(_gamepad) {},\n  onDisconnect: function onDisconnect(_index) {},\n  onBeforeCycle: function onBeforeCycle() {},\n  onAfterCycle: function onAfterCycle() {},\n  getGamepads: function getGamepads() {\n    return this.gamepads;\n  },\n  getGamepad: function getGamepad(id) {\n    if (this.gamepads[id]) {\n      return this.gamepads[id];\n    }\n\n    return null;\n  },\n  set: function set(property, value) {\n    var properties = ['axeThreshold'];\n\n    if (properties.indexOf(property) >= 0) {\n      if (property === 'axeThreshold' && (!parseFloat(value) || value < 0.0 || value > 1.0)) {\n        (0,_tools__WEBPACK_IMPORTED_MODULE_0__.error)(_constants__WEBPACK_IMPORTED_MODULE_1__.MESSAGES.INVALID_VALUE_NUMBER);\n        return;\n      }\n\n      this[property] = value;\n\n      if (property === 'axeThreshold') {\n        var gps = this.getGamepads();\n        var ids = Object.keys(gps);\n\n        for (var x = 0; x < ids.length; x++) {\n          gps[ids[x]].set('axeThreshold', this.axeThreshold);\n        }\n      }\n    } else {\n      (0,_tools__WEBPACK_IMPORTED_MODULE_0__.error)(_constants__WEBPACK_IMPORTED_MODULE_1__.MESSAGES.INVALID_PROPERTY);\n    }\n  },\n  checkStatus: function checkStatus() {\n    var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;\n    var gamepadIds = Object.keys(gameControl.gamepads);\n    gameControl.onBeforeCycle();\n\n    for (var x = 0; x < gamepadIds.length; x++) {\n      gameControl.gamepads[gamepadIds[x]].checkStatus();\n    }\n\n    gameControl.onAfterCycle();\n\n    if (gamepadIds.length > 0) {\n      requestAnimationFrame(gameControl.checkStatus);\n    }\n  },\n  init: function init() {\n    var _this = this;\n\n    window.addEventListener('gamepadconnected', function (e) {\n      var egp = e.gamepad || e.detail.gamepad;\n      (0,_tools__WEBPACK_IMPORTED_MODULE_0__.log)(_constants__WEBPACK_IMPORTED_MODULE_1__.MESSAGES.ON);\n      if (!window.gamepads) window.gamepads = {};\n\n      if (egp) {\n        if (!window.gamepads[egp.index]) {\n          window.gamepads[egp.index] = egp;\n          var gp = _gamepad__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init(egp);\n          gp.set('axeThreshold', _this.axeThreshold);\n          _this.gamepads[gp.id] = gp;\n\n          _this.onConnect(_this.gamepads[gp.id]);\n        }\n\n        if (Object.keys(_this.gamepads).length === 1) _this.checkStatus();\n      }\n    });\n    window.addEventListener('gamepaddisconnected', function (e) {\n      var egp = e.gamepad || e.detail.gamepad;\n      (0,_tools__WEBPACK_IMPORTED_MODULE_0__.log)(_constants__WEBPACK_IMPORTED_MODULE_1__.MESSAGES.OFF);\n\n      if (egp) {\n        delete window.gamepads[egp.index];\n        delete _this.gamepads[egp.index];\n\n        _this.onDisconnect(egp.index);\n      }\n    });\n  },\n  on: function on(eventName, callback) {\n    switch (eventName) {\n      case 'connect':\n        this.onConnect = callback;\n        break;\n\n      case 'disconnect':\n        this.onDisconnect = callback;\n        break;\n\n      case 'beforeCycle':\n      case 'beforecycle':\n        this.onBeforeCycle = callback;\n        break;\n\n      case 'afterCycle':\n      case 'aftercycle':\n        this.onAfterCycle = callback;\n        break;\n\n      default:\n        (0,_tools__WEBPACK_IMPORTED_MODULE_0__.error)(_constants__WEBPACK_IMPORTED_MODULE_1__.MESSAGES.UNKNOWN_EVENT);\n        break;\n    }\n\n    return this;\n  },\n  off: function off(eventName) {\n    switch (eventName) {\n      case 'connect':\n        this.onConnect = function (_gamepad) {};\n\n        break;\n\n      case 'disconnect':\n        this.onDisconnect = function (_index) {};\n\n        break;\n\n      case 'beforeCycle':\n      case 'beforecycle':\n        this.onBeforeCycle = function () {};\n\n        break;\n\n      case 'afterCycle':\n      case 'aftercycle':\n        this.onAfterCycle = function () {};\n\n        break;\n\n      default:\n        (0,_tools__WEBPACK_IMPORTED_MODULE_0__.error)(_constants__WEBPACK_IMPORTED_MODULE_1__.MESSAGES.UNKNOWN_EVENT);\n        break;\n    }\n\n    return this;\n  }\n};\ngameControl.init();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameControl);\n\n//# sourceURL=webpack://gamecontroller.js/./src/gamecontrol.ts?");

/***/ }),

/***/ "./src/gamepad.ts":
/*!************************!*\
  !*** ./src/gamepad.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ \"./src/tools.ts\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\n\n\nvar gamepad = {\n  init: function init(gpad) {\n    var gamepadPrototype = {\n      id: gpad.index,\n      buttons: gpad.buttons.length,\n      axes: Math.floor(gpad.axes.length / 2),\n      axeValues: [],\n      axeThreshold: [1.0],\n      hapticActuator: null,\n      vibrationMode: -1,\n      vibration: false,\n      mapping: gpad.mapping,\n      buttonActions: {},\n      axesActions: {},\n      pressed: {},\n      set: function set(property, value) {\n        var properties = ['axeThreshold'];\n\n        if (properties.indexOf(property) >= 0) {\n          if (property === 'axeThreshold' && (!parseFloat(value) || value < 0.0 || value > 1.0)) {\n            (0,_tools__WEBPACK_IMPORTED_MODULE_0__.error)(_constants__WEBPACK_IMPORTED_MODULE_1__.MESSAGES.INVALID_VALUE_NUMBER);\n            return;\n          }\n\n          this[property] = value;\n        } else {\n          (0,_tools__WEBPACK_IMPORTED_MODULE_0__.error)(_constants__WEBPACK_IMPORTED_MODULE_1__.MESSAGES.INVALID_PROPERTY);\n        }\n      },\n      vibrate: function vibrate() {\n        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.75;\n        var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;\n\n        if (this.hapticActuator) {\n          switch (this.vibrationMode) {\n            case 0:\n              return this.hapticActuator.pulse(value, duration);\n\n            case 1:\n              return this.hapticActuator.playEffect('dual-rumble', {\n                duration: duration,\n                strongMagnitude: value,\n                weakMagnitude: value\n              });\n          }\n        }\n      },\n      triggerDirectionalAction: function triggerDirectionalAction(id, axe, condition, x, index) {\n        if (condition && x % 2 === index) {\n          if (!this.pressed[\"\".concat(id).concat(axe)]) {\n            this.pressed[\"\".concat(id).concat(axe)] = true;\n            this.axesActions[axe][id].before();\n          }\n\n          this.axesActions[axe][id].action();\n        } else if (this.pressed[\"\".concat(id).concat(axe)] && x % 2 === index) {\n          delete this.pressed[\"\".concat(id).concat(axe)];\n          this.axesActions[axe][id].after();\n        }\n      },\n      checkStatus: function checkStatus() {\n        var gp = null;\n        var gps = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : [];\n\n        if (gps.length) {\n          gp = gps[this.id];\n\n          if (!gp) {\n            return;\n          }\n\n          if (gp.buttons) {\n            for (var x = 0; x < this.buttons; x++) {\n              if (gp.buttons[x].pressed === true) {\n                if (!this.pressed[\"button\".concat(x)]) {\n                  this.pressed[\"button\".concat(x)] = true;\n                  this.buttonActions[x].before();\n                }\n\n                this.buttonActions[x].action();\n              } else if (this.pressed[\"button\".concat(x)]) {\n                delete this.pressed[\"button\".concat(x)];\n                this.buttonActions[x].after();\n              }\n            }\n          }\n\n          if (gp.axes) {\n            var modifier = gp.axes.length % 2; // Firefox hack: detects one additional axe\n\n            for (var _x = 0; _x < this.axes * 2; _x++) {\n              var val = Number(gp.axes[_x + modifier].toFixed(4));\n              var axe = Math.floor(_x / 2);\n              this.axeValues[axe][_x % 2] = val;\n              this.triggerDirectionalAction('right', axe, val >= this.axeThreshold[0], _x, 0);\n              this.triggerDirectionalAction('left', axe, val <= -this.axeThreshold[0], _x, 0);\n              this.triggerDirectionalAction('down', axe, val >= this.axeThreshold[0], _x, 1);\n              this.triggerDirectionalAction('up', axe, val <= -this.axeThreshold[0], _x, 1);\n            }\n          }\n        }\n      },\n      associateEvent: function associateEvent(eventName, callback, type) {\n        if (eventName.match(/^button\\d+$/)) {\n          var _eventName$match;\n\n          var buttonId = parseInt(((_eventName$match = eventName.match(/^button(\\d+)$/)) === null || _eventName$match === void 0 ? void 0 : _eventName$match[1]) || \"0\");\n\n          if (buttonId >= 0 && buttonId < this.buttons) {\n            this.buttonActions[buttonId][type] = callback;\n          } else {\n            (0,_tools__WEBPACK_IMPORTED_MODULE_0__.error)(_constants__WEBPACK_IMPORTED_MODULE_1__.MESSAGES.INVALID_BUTTON);\n          }\n        } else if (eventName === 'start') {\n          this.buttonActions[9][type] = callback;\n        } else if (eventName === 'select') {\n          this.buttonActions[8][type] = callback;\n        } else if (eventName === 'r1') {\n          this.buttonActions[5][type] = callback;\n        } else if (eventName === 'r2') {\n          this.buttonActions[7][type] = callback;\n        } else if (eventName === 'l1') {\n          this.buttonActions[4][type] = callback;\n        } else if (eventName === 'l2') {\n          this.buttonActions[6][type] = callback;\n        } else if (eventName === 'power') {\n          if (this.buttons >= 17) {\n            this.buttonActions[16][type] = callback;\n          } else {\n            (0,_tools__WEBPACK_IMPORTED_MODULE_0__.error)(_constants__WEBPACK_IMPORTED_MODULE_1__.MESSAGES.INVALID_BUTTON);\n          }\n        } else if (eventName.match(/^(up|down|left|right)(\\d+)$/)) {\n          var matches = eventName.match(/^(up|down|left|right)(\\d+)$/);\n\n          if (!matches) {\n            (0,_tools__WEBPACK_IMPORTED_MODULE_0__.error)(_constants__WEBPACK_IMPORTED_MODULE_1__.MESSAGES.UNKNOWN_EVENT);\n            return;\n          }\n\n          var direction = matches[1];\n          var axe = parseInt(matches[2]);\n\n          if (axe >= 0 && axe < this.axes) {\n            this.axesActions[axe][direction][type] = callback;\n          } else {\n            (0,_tools__WEBPACK_IMPORTED_MODULE_0__.error)(_constants__WEBPACK_IMPORTED_MODULE_1__.MESSAGES.INVALID_BUTTON);\n          }\n        } else if (eventName.match(/^(up|down|left|right)$/)) {\n          var _eventName$match2;\n\n          var _direction = (_eventName$match2 = eventName.match(/^(up|down|left|right)$/)) === null || _eventName$match2 === void 0 ? void 0 : _eventName$match2[1];\n\n          if (!_direction) {\n            (0,_tools__WEBPACK_IMPORTED_MODULE_0__.error)(_constants__WEBPACK_IMPORTED_MODULE_1__.MESSAGES.UNKNOWN_EVENT);\n            return;\n          }\n\n          this.axesActions[0][_direction][type] = callback;\n        }\n\n        return this;\n      },\n      on: function on(eventName, callback) {\n        return this.associateEvent(eventName, callback, 'action');\n      },\n      off: function off(eventName) {\n        return this.associateEvent(eventName, function () {}, 'action');\n      },\n      after: function after(eventName, callback) {\n        return this.associateEvent(eventName, callback, 'after');\n      },\n      before: function before(eventName, callback) {\n        return this.associateEvent(eventName, callback, 'before');\n      }\n    };\n\n    for (var x = 0; x < gamepadPrototype.buttons; x++) {\n      gamepadPrototype.buttonActions[x] = (0,_tools__WEBPACK_IMPORTED_MODULE_0__.emptyEvents)();\n    }\n\n    for (var _x2 = 0; _x2 < gamepadPrototype.axes; _x2++) {\n      gamepadPrototype.axesActions[_x2] = {\n        down: (0,_tools__WEBPACK_IMPORTED_MODULE_0__.emptyEvents)(),\n        left: (0,_tools__WEBPACK_IMPORTED_MODULE_0__.emptyEvents)(),\n        right: (0,_tools__WEBPACK_IMPORTED_MODULE_0__.emptyEvents)(),\n        up: (0,_tools__WEBPACK_IMPORTED_MODULE_0__.emptyEvents)()\n      };\n      gamepadPrototype.axeValues[_x2] = [0, 0];\n    } // check if vibration actuator exists\n\n\n    if (gpad.hapticActuators) {\n      // newer standard\n      if (typeof gpad.hapticActuators.pulse === 'function') {\n        gamepadPrototype.hapticActuator = gpad.hapticActuators;\n        gamepadPrototype.vibrationMode = 0;\n        gamepadPrototype.vibration = true;\n      } else if (gpad.hapticActuators[0] && typeof gpad.hapticActuators[0].pulse === 'function') {\n        gamepadPrototype.hapticActuator = gpad.hapticActuators[0];\n        gamepadPrototype.vibrationMode = 0;\n        gamepadPrototype.vibration = true;\n      }\n    } else if (gpad.vibrationActuator) {\n      // old chrome stuff\n      if (typeof gpad.vibrationActuator.playEffect === 'function') {\n        gamepadPrototype.hapticActuator = gpad.vibrationActuator;\n        gamepadPrototype.vibrationMode = 1;\n        gamepadPrototype.vibration = true;\n      }\n    }\n\n    return gamepadPrototype;\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gamepad);\n\n//# sourceURL=webpack://gamecontroller.js/./src/gamepad.ts?");

/***/ }),

/***/ "./src/tools.ts":
/*!**********************!*\
  !*** ./src/tools.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isGamepadSupported\": () => (/* binding */ isGamepadSupported),\n/* harmony export */   \"log\": () => (/* binding */ log),\n/* harmony export */   \"error\": () => (/* binding */ error),\n/* harmony export */   \"emptyEvents\": () => (/* binding */ emptyEvents)\n/* harmony export */ });\nvar log = function log(message) {\n  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';\n\n  if (type === 'error') {\n    if (console && typeof console.error === 'function') console.error(message);\n  } else {\n    if (console && typeof console.info === 'function') console.info(message);\n  }\n};\n\nvar error = function error(message) {\n  return log(message, 'error');\n};\n\nvar isGamepadSupported = function isGamepadSupported() {\n  return navigator.getGamepads && typeof navigator.getGamepads === 'function' || typeof navigator.webkitGetGamepads === 'function' || false;\n};\n\nvar emptyEvents = function emptyEvents() {\n  return {\n    action: function action() {},\n    after: function after() {},\n    before: function before() {}\n  };\n};\n\n\n\n//# sourceURL=webpack://gamecontroller.js/./src/tools.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/browser.ts");
/******/ 	
/******/ })()
;