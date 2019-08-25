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
    for (let x = 0; x < this.buttons; x++) {
      if (gp.buttons[x].pressed === true) {
        this.buttonActions[x].action();
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
        action: function() {},
        after: function() {}
      };
    }
    for (let x = 0; x < this.axes; x++) {
      this.axesActions[x] = {
        down: {
          action: function() {},
          after: function() {}
        },
        left: {
          action: function() {},
          after: function() {}
        },
        right: {
          action: function() {},
          after: function() {}
        },
        up: {
          action: function() {},
          after: function() {}
        }
      };
    }
    return this;
  },
  on: function(eventName, callback) {
    if (eventName.match(/^button\d$/)) {
      const buttonId = parseInt(eventName.match(/^button(\d)$/)[1]);
      if (buttonId >= 0 && buttonId < this.buttons) {
        this.buttonActions[buttonId].action = callback;
      } else {
        log('Cannot associate event to button that does not exist', 'error');
      }
    }
    return this;
  },
  off: function(eventName) {
    if (eventName.match(/^button\d$/)) {
      const buttonId = parseInt(eventName.match(/^button(\d)$/)[1]);
      if (buttonId >= 0 && buttonId < this.buttons) {
        this.buttonActions[buttonId].action = function() {};
      } else {
        log('Cannot deassociate event to button that does not exist', 'error');
      }
    }
    return this;
  }
};

export default gamepad;
