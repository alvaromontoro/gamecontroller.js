import { log, error, isGamepadSupported } from './tools';
import { MESSAGE } from './constants';
import gamepad from './gamepad';

const gameControl = {
  gamepads: {},
  threshold: [1.0], // this is an array so it can be expanded without breaking in the future
  isReady: isGamepadSupported(),
  events: ['connect', 'disconnect', 'beforecycle', 'aftercycle'],
  connect: function() {},
  disconnect: function() {},
  beforecycle: function() {},
  aftercycle: function() {},
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
    const properties = ['threshold'];
    if (['threshold'].indexOf(property) >= 0) {
      if (property === 'threshold' && (!parseFloat(value) || value < 0.0 || value > 1.0)) {
        error(MESSAGE.INVALID_THRESHOLD);
        return;
      }

      this[property] = value;

      if (property === 'threshold') {
        const gps = this.getGamepads();
        const ids = Object.keys(gps);
        for (let x = 0; x < ids.length; x++) {
          gps[ids[x]].set('threshold', this.threshold);
        }
      }
    } else {
      error(MESSAGE.INVALID_PROPERTY);
    }
  },
  checkStatus: function() {
    const requestAnimationFrame =
      window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    const gamepadIds = Object.keys(gameControl.gamepads);

    gameControl.beforecycle();

    for (let x = 0; x < gamepadIds.length; x++) {
      gameControl.gamepads[gamepadIds[x]].checkStatus();
    }

    gameControl.aftercycle();

    if (gamepadIds.length > 0) {
      requestAnimationFrame(gameControl.checkStatus);
    }
  },
  init: function() {
    window.addEventListener('gamepadconnected', e => {
      log(MESSAGE.GAMEPAD_ON);
      if (!window.gamepads) window.gamepads = {};
      if (!window.gamepads[e.gamepad.index]) {
        window.gamepads[e.gamepad.index] = e.gamepad;
        const gp = gamepad.init(e.gamepad);
        gp.set('threshold', this.threshold);
        this.gamepads[gp.id] = gp;
        this.connect(this.gamepads[gp.id]);
      }
      if (Object.keys(this.gamepads).length === 1) this.checkStatus();
    });
    window.addEventListener('gamepaddisconnected', e => {
      log(MESSAGE.GAMEPAD_OFF);
      delete window.gamepads[e.gamepad.index];
      delete this.gamepads[e.gamepad.index];
      this.disconnect(e.gamepad.index);
    });
  },
  on: function(eventName, callback) {
    if (this.events.indexOf(eventName) >= 0) {
      this[eventName] = callback;
    } else {
      error(MESSAGE.INVALID_EVENT);
    }
    return this;
  },
  off: function(eventName) {
    if (this.events.indexOf(eventName) >= 0) {
      this[eventName] = function() {};
    } else {
      error(MESSAGE.INVALID_EVENT);
    }
    return this;
  }
};

gameControl.init();

export default gameControl;
