import { log, error, isGamepadSupported } from './tools';
import { MESSAGES } from './constants';
import gamepad from './gamepad';
import type { GameControl, GCGamepads, GCGamepad, GCCallback, GCConnectCallback, GCDisconnectCallback } from './types';

declare global {
  interface Window {
    gamepads: {
      [id: number]: Gamepad
    }
  }
}

const gameControl: GameControl = {
  gamepads: {} as GCGamepads,
  axeThreshold: [1.0], // this is an array so it can be expanded without breaking in the future
  isReady: isGamepadSupported(),
  onConnect: function(_gamepad: GCGamepad) {} as GCConnectCallback,
  onDisconnect: function(_index: number) {} as GCDisconnectCallback,
  onBeforeCycle: function() {} as GCCallback,
  onAfterCycle: function() {} as GCCallback,
  getGamepads: function() {
    return this.gamepads;
  },
  getGamepad: function(id: number) {
    if (this.gamepads[id]) {
      return this.gamepads[id];
    }
    return null;
  },
  set: function(property: string, value: any) {
    const properties = ['axeThreshold'];
    if (properties.indexOf(property) >= 0) {
      if (property === 'axeThreshold' && (!parseFloat(value) || value < 0.0 || value > 1.0)) {
        error(MESSAGES.INVALID_VALUE_NUMBER);
        return;
      }

      (this as any)[property] = value;

      if (property === 'axeThreshold') {
        const gps = this.getGamepads();
        const ids = Object.keys(gps);
        for (let x = 0; x < ids.length; x++) {
          gps[ids[x]].set('axeThreshold', this.axeThreshold);
        }
      }
    } else {
      error(MESSAGES.INVALID_PROPERTY);
    }
  },
  checkStatus: function() {
    const requestAnimationFrame =
      window.requestAnimationFrame || (window as any).webkitRequestAnimationFrame;
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
      const egp: GamepadEvent['gamepad'] = e.gamepad || (e as any).detail.gamepad;
      log(MESSAGES.ON);
      if (!window.gamepads) window.gamepads = {};
      if (egp) {
        if (!window.gamepads[egp.index]) {
          window.gamepads[egp.index] = egp;
          const gp = gamepad.init(egp);
          gp.set('axeThreshold', this.axeThreshold);
          this.gamepads[gp.id] = gp;
          this.onConnect(this.gamepads[gp.id]);
        }
        if (Object.keys(this.gamepads).length === 1) this.checkStatus();
      }
    });
    window.addEventListener('gamepaddisconnected', e => {
      const egp = e.gamepad || (e as any).detail.gamepad;
      log(MESSAGES.OFF);
      if (egp) {
        delete window.gamepads[egp.index];
        delete this.gamepads[egp.index];
        this.onDisconnect(egp.index);
      }
    });
  },
  on: function(eventName: string, callback: GCCallback | GCConnectCallback | GCDisconnectCallback) {
    switch (eventName) {
      case 'connect':
        this.onConnect = callback as GCConnectCallback;
        break;
      case 'disconnect':
        this.onDisconnect = callback as GCDisconnectCallback;
        break;
      case 'beforeCycle':
      case 'beforecycle':
        this.onBeforeCycle = callback as GCCallback;
        break;
      case 'afterCycle':
      case 'aftercycle':
        this.onAfterCycle = callback as GCCallback;
        break;
      default:
        error(MESSAGES.UNKNOWN_EVENT);
        break;
    }
    return this;
  },
  off: function(eventName: string) {
    switch (eventName) {
      case 'connect':
        this.onConnect = function(_gamepad: GCGamepad) {};
        break;
      case 'disconnect':
        this.onDisconnect = function(_index: number) {};
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
        error(MESSAGES.UNKNOWN_EVENT);
        break;
    }
    return this;
  }
};

gameControl.init();

export default gameControl;
