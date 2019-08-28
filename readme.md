# gameController.js

A JavaScript library that lets you handle, configure, and use gamepad and controllers on a browser.

[![Build Status](https://travis-ci.org/alvaromontoro/gamecontrol.svg?branch=master)](https://travis-ci.org/alvaromontoro/gamecontroller.js)
[![npm](https://img.shields.io/npm/v/gamecontroller.js.svg)](https://www.npmjs.com/package/gamecontroller.js)
[![npm](https://img.shields.io/npm/l/gamecontroller.js.svg)](https://www.npmjs.com/package/gamecontroller.js)

## Getting started

GameController.js is a lightweight library (~6KB) that uses JavaScript and the standard [Gamepad API](https://w3c.github.io/gamepad/), and does not have any plugin/library dependencies.

### Installation

From npm:

```
npm i gamecontroller.js
```

From yarn:

```
yarn add gamecontroller.js
```

Directly into your webpage (check [latest release on github](https://github.com/alvaromontoro/gamecontroller.js/releases)):

```
<script src="./gamecontroller.min.js"></script>
```

### Browser Support

| ![Edge Logo 32x32](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/56.3.2/edge/edge_32x32.png)<br>Edge | ![Firefox Logo](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/56.3.2/archive/firefox_23-56/firefox_23-56_32x32.png)<br>Firefox | ![Chrome](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/56.3.2/archive/chrome_12-48/chrome_12-48_32x32.png)<br>Chrome | ![Safari Logo](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/56.3.2/archive/safari_1-7/safari_1-7_32x32.png)<br>Safari | ![Opera logo](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/56.3.2/opera/opera_32x32.png)<br>Opera |
| ---- | ------- | ------ | ------ | ----- |
| 12+  | 29+     | 25+    | 10.1+  | 24+   |


### Usage

Once the file is imported into the project, the object `gameControl` will be available and ready to be used.

```javascript
gameControl.on('connect', function(gamepad) {
  gamepad.on('up', moveCharacterUp);
});
```

### Examples

The `examples` folder contains different examples to showcase how to use the library:

- [Connectivity](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-0-connectivity.html): shows how to detect if a gamepad was connected/disconnected.
- [Buttons and Joysticks](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-3-buttons-and-joysticks.html): see how the buttons from your gamepad map to the default gamepad.
- [SNES Controller](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-4-snes-controller.html): replica of a SNES controller (based on a previous CodePen demo).
- [Alvanoid](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-5-alvanoid.html): small Arkanoid-based game (based on a previous CodePen demo).
- [Pong](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-6-multiplayer.html): multiplayer demo with the classic game Pong for 2 players on 2 gamepads.
