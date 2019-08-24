import { log, isGamepadSupported } from './tools';

const gameControl = {
  isReady: isGamepadSupported(),
  onConnect: function() {},
  onDisconnect: function() {},
  init: function() {
    window.addEventListener('gamepadconnected', e => {
      log('Gamepad detected.');
      if (!window.gamepads) window.gamepads = {};
      if (!window.gamepads[e.gamepad.index]) {
        window.gamepads[e.gamepad.index] = e.gamepad;
        this.onConnect(e.gamepad.index);
      }
    });
    window.addEventListener('gamepaddisconnected', e => {
      log('Gamepad disconnected.');
      delete window.gamepads[e.gamepad.index];
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
  }
};

gameControl.init();

export default gameControl;
