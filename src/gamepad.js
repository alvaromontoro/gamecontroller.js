import { log } from './tools';

const gamepad = {
  id: '',
  buttons: 0,
  axes: 0,
  mapping: '',
  buttonActions: {},
  axesActions: {},
  checkStatus: function() {
    const gps = navigator.getGamepads
      ? navigator.getGamepads()
      : navigator.webkitGetGamepads
      ? navigator.webkitGetGamepads
      : [];
    const gp = gps[this.id];
    if (gp.buttons) {
      for (let x = 0; x < this.buttons; x++) {
        if (gp.buttons[x].pressed === true) {
          this.buttonActions[x].action();
        }
      }
    }
    if (gp.axes) {
      for (let x = 0; x < gp.axes.length; x++) {
        const val = gp.axes[x].toFixed(4);
        const axe = Math.floor(x / 2);
        if (val >= 1.0 && x % 2 === 0) {
          this.axesActions[axe].right.action();
        } else if (val <= -1.0 && x % 2 === 0) {
          this.axesActions[axe].left.action();
        } else if (val >= 1.0 && x % 2 === 1) {
          this.axesActions[axe].down.action();
        } else if (val <= -1.0 && x % 2 === 1) {
          this.axesActions[axe].up.action();
        }
      }
    }
  },
  init: function(gp) {
    this.id = gp.index;
    this.buttons = gp.buttons.length;
    this.axes = Math.floor(gp.axes.length / 2);
    this.mapping = gp.mapping;
    for (let x = 0; x < this.buttons; x++) {
      this.buttonActions[x] = {
        action: function() {}
      };
    }
    for (let x = 0; x < this.axes; x++) {
      this.axesActions[x] = {
        down: {
          action: function() {}
        },
        left: {
          action: function() {}
        },
        right: {
          action: function() {}
        },
        up: {
          action: function() {}
        }
      };
    }
    return this;
  },
  on: function(eventName, callback) {
    if (eventName.match(/^button\d+$/)) {
      const buttonId = parseInt(eventName.match(/^button(\d+)$/)[1]);
      if (buttonId >= 0 && buttonId < this.buttons) {
        this.buttonActions[buttonId].action = callback;
      } else {
        log(`Cannot associate event to button that does not exist (${buttonId}).`, 'error');
      }
    } else if (eventName === 'start') {
      this.buttonActions[9].action = callback;
    } else if (eventName === 'select') {
      this.buttonActions[8].action = callback;
    } else if (eventName === 'power') {
      if (this.buttons >= 17) {
        this.buttonActions[16].action = callback;
      } else {
        log('No power button available on this gamepad.', 'error');
      }
    } else if (eventName.match(/^(up|down|left|right)(\d+)$/)) {
      const matches = eventName.match(/^(up|down|left|right)(\d+)$/);
      const direction = matches[1];
      const axe = parseInt(matches[2]);
      if (axe >= 0 && axe < this.axes) {
        this.axesActions[axe][direction].action = callback;
      } else {
        log(`Cannot associate '${direction}' to axe that does not exist (${axe}).`, 'error');
      }
    }

    return this;
  },
  off: function(eventName) {
    if (eventName.match(/^button\d+$/)) {
      const buttonId = parseInt(eventName.match(/^button(\d+)$/)[1]);
      if (buttonId >= 0 && buttonId < this.buttons) {
        this.buttonActions[buttonId].action = function() {};
      } else {
        log(`Cannot deassociate event to button that does not exist (${buttonId})`, 'error');
      }
    } else if (eventName === 'start') {
      this.buttonActions[9].action = function() {};
    } else if (eventName === 'select') {
      this.buttonActions[8].action = function() {};
    } else if (eventName === 'power') {
      if (this.buttons >= 17) {
        this.buttonActions[16].action = function() {};
      } else {
        log('No power button available on this gamepad.', 'error');
      }
    } else if (eventName.match(/^(up|down|left|right)(\d+)$/)) {
      const matches = eventName.match(/^(up|down|left|right)(\d+)$/);
      const direction = matches[1];
      const axe = parseInt(matches[2]);
      if (axe >= 0 && axe < this.axes) {
        this.axesActions[axe][direction].action = function() {};
      } else {
        log(`Cannot deassociate '${direction}' to axe that does not exist (${axe}).`, 'error');
      }
    }
    return this;
  }
};

export default gamepad;
