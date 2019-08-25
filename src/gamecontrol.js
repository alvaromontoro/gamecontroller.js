import { log, isGamepadSupported } from './tools';
import gamepad from './gamepad';

const gameControl = {
  gamepads: {},
  isReady: isGamepadSupported(),
  onConnect: function() {},
  onDisconnect: function() {},
  getGamepads: function() {
    return this.gamepads;
  },
  getGamepad: function(id) {
    if (this.gamepads[id]) {
      return this.gamepads[id];
    }
    return null;
  },
  checkStatus: function() {
    const requestAnimationFrame =
      window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    const gamepadIds = Object.keys(gameControl.gamepads);

    for (let x = 0; x < gamepadIds.length; x++) {
      gameControl.gamepads[gamepadIds[x]].checkStatus();
    }
    if (gamepadIds.length > 0) {
      requestAnimationFrame(gameControl.checkStatus);
    }
  },
  init: function() {
    window.addEventListener('gamepadconnected', e => {
      log('Gamepad detected.');
      if (!window.gamepads) window.gamepads = {};
      if (!window.gamepads[e.gamepad.index]) {
        const gp = gamepad.init(e.gamepad);
        window.gamepads[e.gamepad.index] = e.gamepad;
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
    }
  },
  off: function(eventName) {
    switch (eventName) {
      case 'connect':
        this.onConnect = function() {};
        break;
      case 'disconnect':
        this.onDisconnect = function() {};
        break;
    }
  }
};

gameControl.init();

export default gameControl;
