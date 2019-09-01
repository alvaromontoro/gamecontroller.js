import { log, error, isGamepadSupported } from './tools';
import gamepad from './gamepad';

const gameControl = {
  gamepads: {},
  axeThreshold: [1.0], // this is an array so it can be expanded without breaking in the future
  isReady: isGamepadSupported(),
  onConnect: function() {},
  onDisconnect: function() {},
  onBeforeCycle: function() {},
  onAfterCycle: function() {},
  getGamepads: function() {
    return this.gamepads;
  },
  getGamepad: function(id) {
    if (this.gamepads[id]) {
      return this.gamepads[id];
    }
    return null;
  },
  set: function(property, value) {
    const properties = ['axeThreshold'];
    if (properties.indexOf(property) >= 0) {
      if (property === 'axeThreshold' && (!parseFloat(value) || value < 0.0 || value > 1.0)) {
        error(`Invalid axeThreshold. The value must be a number between 0.00 and 1.00.`);
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
    } else {
      error(`Invalid property (${property})`);
    }
  },
  checkStatus: function() {
    const requestAnimationFrame =
      window.requestAnimationFrame || window.webkitRequestAnimationFrame;
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
  init: function() {
    window.addEventListener('gamepadconnected', e => {
      log('Gamepad detected.');
      if (!window.gamepads) window.gamepads = {};
      if (!window.gamepads[e.gamepad.index]) {
        window.gamepads[e.gamepad.index] = e.gamepad;
        const gp = gamepad.init(e.gamepad);
        gp.set('axeThreshold', this.axeThreshold);
        this.gamepads[gp.id] = gp;
        this.onConnect(this.gamepads[gp.id]);
      }
      if (Object.keys(this.gamepads).length === 1) this.checkStatus();
    });
    window.addEventListener('gamepaddisconnected', e => {
      log('Gamepad disconnected.');
      delete window.gamepads[e.gamepad.index];
      delete this.gamepads[e.gamepad.index];
      this.onDisconnect(e.gamepad.index);
    });
  },
  on: function(eventName, callback) {
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
        error('Unknown event name');
        break;
    }
    return this;
  },
  off: function(eventName) {
    switch (eventName) {
      case 'connect':
        this.onConnect = function() {};
        break;
      case 'disconnect':
        this.onDisconnect = function() {};
        break;
      case 'beforeCycle':
      case 'beforecycle':
        this.onBeforeCycle = function() {};
        break;
      case 'afterCycle':
      case 'aftercycle':
        this.onAfterCycle = function() {};
        break;
      default:
        error('Unknown event name');
        break;
    }
    return this;
  }
};

gameControl.init();

export default gameControl;
