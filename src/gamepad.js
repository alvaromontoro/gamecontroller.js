import { log } from './tools';

const gamepad = {
  init: function(gpad) {
    let gamepadPrototype = {
      id: gpad.index,
      buttons: gpad.buttons.length,
      axes: Math.floor(gpad.axes.length / 2),
      axeValues: [],
      axeThreshold: [1.0],
      mapping: gpad.mapping,
      buttonActions: {},
      axesActions: {},
      set: function(property, value) {
        const properties = ['axeThreshold'];
        if (properties.indexOf(property) >= 0) {
          if (property === 'axeThreshold' && (!parseFloat(value) || value < 0.0 || value > 1.0)) {
            log(`Invalid axeThreshold. The value must be a number between 0.00 and 1.00.`, 'error');
            return;
          }
          this[property] = value;
        } else {
          log(`Invalid property (${property}).`, 'error');
        }
      },
      checkStatus: function() {
        let gp = {};
        const gps = navigator.getGamepads
          ? navigator.getGamepads()
          : navigator.webkitGetGamepads
          ? navigator.webkitGetGamepads
          : [];
        if (gps.length) {
          gp = gps[this.id];
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
              this.axeValues[axe][x % 2] = val;
              if (val >= this.axeThreshold[0] && x % 2 === 0) {
                this.axesActions[axe].right.action();
              } else if (val <= -this.axeThreshold[0] && x % 2 === 0) {
                this.axesActions[axe].left.action();
              } else if (val >= this.axeThreshold[0] && x % 2 === 1) {
                this.axesActions[axe].down.action();
              } else if (val <= -this.axeThreshold[0] && x % 2 === 1) {
                this.axesActions[axe].up.action();
              }
            }
          }
        }
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
        } else if (eventName === 'r1') {
          this.buttonActions[5].action = callback;
        } else if (eventName === 'r2') {
          this.buttonActions[7].action = callback;
        } else if (eventName === 'l1') {
          this.buttonActions[4].action = callback;
        } else if (eventName === 'l2') {
          this.buttonActions[6].action = callback;
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
        } else if (eventName.match(/^(up|down|left|right)$/)) {
          const direction = eventName.match(/^(up|down|left|right)$/)[1];
          this.axesActions[0][direction].action = callback;
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
        } else if (eventName === 'r1') {
          this.buttonActions[5].action = function() {};
        } else if (eventName === 'r2') {
          this.buttonActions[7].action = function() {};
        } else if (eventName === 'l1') {
          this.buttonActions[4].action = function() {};
        } else if (eventName === 'l2') {
          this.buttonActions[6].action = function() {};
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
        } else if (eventName.match(/^(up|down|left|right)$/)) {
          const direction = eventName.match(/^(up|down|left|right)$/)[1];
          this.axesActions[0][direction].action = function() {};
        }
        return this;
      }
    };

    for (let x = 0; x < gamepadPrototype.buttons; x++) {
      gamepadPrototype.buttonActions[x] = {
        action: function() {}
      };
    }
    for (let x = 0; x < gamepadPrototype.axes; x++) {
      gamepadPrototype.axesActions[x] = {
        down: { action: function() {} },
        left: { action: function() {} },
        right: { action: function() {} },
        up: { action: function() {} }
      };
      gamepadPrototype.axeValues[x] = [0, 0];
    }

    return gamepadPrototype;
  }
};

export default gamepad;
