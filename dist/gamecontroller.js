/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/gamecontrol.js":
/*!****************************!*\
  !*** ./src/gamecontrol.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ \"./src/tools.js\");\n/* harmony import */ var _gamepad__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gamepad */ \"./src/gamepad.js\");\n\n\n\nconst gameControl = {\n  gamepads: {},\n  isReady: Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"isGamepadSupported\"])(),\n  onConnect: function() {},\n  onDisconnect: function() {},\n  onBeforeCycle: function() {},\n  onAfterCycle: function() {},\n  getGamepads: function() {\n    return this.gamepads;\n  },\n  getGamepad: function(id) {\n    if (this.gamepads[id]) {\n      return this.gamepads[id];\n    }\n    return null;\n  },\n  checkStatus: function() {\n    const requestAnimationFrame =\n      window.requestAnimationFrame || window.webkitRequestAnimationFrame;\n    const gamepadIds = Object.keys(gameControl.gamepads);\n\n    gameControl.onBeforeCycle();\n\n    for (let x = 0; x < gamepadIds.length; x++) {\n      gameControl.gamepads[gamepadIds[x]].checkStatus();\n    }\n\n    gameControl.onAfterCycle();\n\n    if (gamepadIds.length > 0) {\n      requestAnimationFrame(gameControl.checkStatus);\n    }\n  },\n  init: function() {\n    window.addEventListener('gamepadconnected', e => {\n      Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"log\"])('Gamepad detected.');\n      if (!window.gamepads) window.gamepads = {};\n      if (!window.gamepads[e.gamepad.index]) {\n        const gp = _gamepad__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init(e.gamepad);\n        window.gamepads[e.gamepad.index] = e.gamepad;\n        this.gamepads[gp.id] = gp;\n        this.onConnect(this.gamepads[gp.id]);\n      }\n      if (Object.keys(this.gamepads).length === 1) this.checkStatus();\n    });\n    window.addEventListener('gamepaddisconnected', e => {\n      Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"log\"])('Gamepad disconnected.');\n      delete window.gamepads[e.gamepad.index];\n      delete this.gamepads[e.gamepad.index];\n      this.onDisconnect(e.gamepad.index);\n    });\n  },\n  on: function(eventName, callback) {\n    switch (eventName) {\n      case 'connect':\n        this.onConnect = callback;\n        break;\n      case 'disconnect':\n        this.onDisconnect = callback;\n        break;\n      case 'beforeCycle':\n      case 'beforecycle':\n        this.onBeforeCycle = callback;\n        break;\n      case 'afterCycle':\n      case 'aftercycle':\n        this.onAfterCycle = callback;\n        break;\n      default:\n        Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"log\"])('Unknown event name', 'error');\n        break;\n    }\n    return this;\n  },\n  off: function(eventName) {\n    switch (eventName) {\n      case 'connect':\n        this.onConnect = function() {};\n        break;\n      case 'disconnect':\n        this.onDisconnect = function() {};\n        break;\n      case 'beforeCycle':\n      case 'beforecycle':\n        this.onBeforeCycle = function() {};\n        break;\n      case 'afterCycle':\n      case 'aftercycle':\n        this.onAfterCycle = function() {};\n        break;\n      default:\n        Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"log\"])('Unknown event name', 'error');\n        break;\n    }\n    return this;\n  }\n};\n\ngameControl.init();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (gameControl);\n\n\n//# sourceURL=webpack:///./src/gamecontrol.js?");

/***/ }),

/***/ "./src/gamepad.js":
/*!************************!*\
  !*** ./src/gamepad.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ \"./src/tools.js\");\n\n\nconst gamepad = {\n  init: function(gpad) {\n    let gamepadPrototype = {\n      id: gpad.index,\n      buttons: gpad.buttons.length,\n      axes: Math.floor(gpad.axes.length / 2),\n      mapping: gpad.mapping,\n      buttonActions: {},\n      axesActions: {},\n      checkStatus: function() {\n        const gps = navigator.getGamepads\n          ? navigator.getGamepads()\n          : navigator.webkitGetGamepads\n          ? navigator.webkitGetGamepads\n          : [];\n        const gp = gps[this.id];\n        if (gp.buttons) {\n          for (let x = 0; x < this.buttons; x++) {\n            if (gp.buttons[x].pressed === true) {\n              this.buttonActions[x].action();\n            }\n          }\n        }\n        if (gp.axes) {\n          for (let x = 0; x < gp.axes.length; x++) {\n            const val = gp.axes[x].toFixed(4);\n            const axe = Math.floor(x / 2);\n            if (val >= 1.0 && x % 2 === 0) {\n              this.axesActions[axe].right.action();\n            } else if (val <= -1.0 && x % 2 === 0) {\n              this.axesActions[axe].left.action();\n            } else if (val >= 1.0 && x % 2 === 1) {\n              this.axesActions[axe].down.action();\n            } else if (val <= -1.0 && x % 2 === 1) {\n              this.axesActions[axe].up.action();\n            }\n          }\n        }\n      },\n      on: function(eventName, callback) {\n        if (eventName.match(/^button\\d+$/)) {\n          const buttonId = parseInt(eventName.match(/^button(\\d+)$/)[1]);\n          if (buttonId >= 0 && buttonId < this.buttons) {\n            this.buttonActions[buttonId].action = callback;\n          } else {\n            Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"log\"])(`Cannot associate event to button that does not exist (${buttonId}).`, 'error');\n          }\n        } else if (eventName === 'start') {\n          this.buttonActions[9].action = callback;\n        } else if (eventName === 'select') {\n          this.buttonActions[8].action = callback;\n        } else if (eventName === 'r1') {\n          this.buttonActions[5].action = callback;\n        } else if (eventName === 'r2') {\n          this.buttonActions[7].action = callback;\n        } else if (eventName === 'l1') {\n          this.buttonActions[4].action = callback;\n        } else if (eventName === 'l2') {\n          this.buttonActions[6].action = callback;\n        } else if (eventName === 'power') {\n          if (this.buttons >= 17) {\n            this.buttonActions[16].action = callback;\n          } else {\n            Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"log\"])('No power button available on this gamepad.', 'error');\n          }\n        } else if (eventName.match(/^(up|down|left|right)(\\d+)$/)) {\n          const matches = eventName.match(/^(up|down|left|right)(\\d+)$/);\n          const direction = matches[1];\n          const axe = parseInt(matches[2]);\n          if (axe >= 0 && axe < this.axes) {\n            this.axesActions[axe][direction].action = callback;\n          } else {\n            Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"log\"])(`Cannot associate '${direction}' to axe that does not exist (${axe}).`, 'error');\n          }\n        } else if (eventName.match(/^(up|down|left|right)$/)) {\n          const direction = eventName.match(/^(up|down|left|right)$/)[1];\n          this.axesActions[0][direction].action = callback;\n        }\n\n        return this;\n      },\n      off: function(eventName) {\n        if (eventName.match(/^button\\d+$/)) {\n          const buttonId = parseInt(eventName.match(/^button(\\d+)$/)[1]);\n          if (buttonId >= 0 && buttonId < this.buttons) {\n            this.buttonActions[buttonId].action = function() {};\n          } else {\n            Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"log\"])(`Cannot deassociate event to button that does not exist (${buttonId})`, 'error');\n          }\n        } else if (eventName === 'start') {\n          this.buttonActions[9].action = function() {};\n        } else if (eventName === 'select') {\n          this.buttonActions[8].action = function() {};\n        } else if (eventName === 'r1') {\n          this.buttonActions[5].action = function() {};\n        } else if (eventName === 'r2') {\n          this.buttonActions[7].action = function() {};\n        } else if (eventName === 'l1') {\n          this.buttonActions[4].action = function() {};\n        } else if (eventName === 'l2') {\n          this.buttonActions[6].action = function() {};\n        } else if (eventName === 'power') {\n          if (this.buttons >= 17) {\n            this.buttonActions[16].action = function() {};\n          } else {\n            Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"log\"])('No power button available on this gamepad.', 'error');\n          }\n        } else if (eventName.match(/^(up|down|left|right)(\\d+)$/)) {\n          const matches = eventName.match(/^(up|down|left|right)(\\d+)$/);\n          const direction = matches[1];\n          const axe = parseInt(matches[2]);\n          if (axe >= 0 && axe < this.axes) {\n            this.axesActions[axe][direction].action = function() {};\n          } else {\n            Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"log\"])(`Cannot deassociate '${direction}' to axe that does not exist (${axe}).`, 'error');\n          }\n        } else if (eventName.match(/^(up|down|left|right)$/)) {\n          const direction = eventName.match(/^(up|down|left|right)$/)[1];\n          this.axesActions[0][direction].action = function() {};\n        }\n        return this;\n      }\n    };\n\n    for (let x = 0; x < gamepadPrototype.buttons; x++) {\n      gamepadPrototype.buttonActions[x] = {\n        action: function() {}\n      };\n    }\n    for (let x = 0; x < gamepadPrototype.axes; x++) {\n      gamepadPrototype.axesActions[x] = {\n        down: { action: function() {} },\n        left: { action: function() {} },\n        right: { action: function() {} },\n        up: { action: function() {} }\n      };\n    }\n\n    return gamepadPrototype;\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (gamepad);\n\n\n//# sourceURL=webpack:///./src/gamepad.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ \"./src/tools.js\");\n/* harmony import */ var _gamecontrol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gamecontrol */ \"./src/gamecontrol.js\");\n// This file is the entry point\n\n\n\nif (Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"isGamepadSupported\"])()) {\n  window.gameControl = _gamecontrol__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n} else {\n  Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"log\"])('Your web browser does not support the Gamepad API.', 'error');\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/tools.js":
/*!**********************!*\
  !*** ./src/tools.js ***!
  \**********************/
/*! exports provided: isGamepadSupported, log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isGamepadSupported\", function() { return isGamepadSupported; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"log\", function() { return log; });\nconst log = (message, type = 'log') => {\n  if (type === 'error') {\n    if (console && typeof console.error === 'function') console.error(message);\n  } else {\n    if (console && typeof console.log === 'function') console.log(message);\n  }\n};\n\nconst isGamepadSupported = () =>\n  (navigator.getGamepads && typeof navigator.getGamepads === 'function') ||\n  (navigator.getGamepads && typeof navigator.webkitGetGamepads === 'function');\n\n\n\n\n//# sourceURL=webpack:///./src/tools.js?");

/***/ })

/******/ });