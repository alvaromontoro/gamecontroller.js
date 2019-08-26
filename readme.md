# gameController.js

A JavaScript library that lets you handle, configure, and use gamepad and controllers on a browser.

[![Build Status](https://travis-ci.org/alvaromontoro/gamecontrol.svg?branch=master)](https://travis-ci.org/alvaromontoro/gamecontrol)
[![npm](https://img.shields.io/npm/v/gamecontroller.js.svg)](https://www.npmjs.com/package/gamecontroller.js)
[![npm](https://img.shields.io/npm/l/gamecontroller.js.svg)](https://www.npmjs.com/package/gamecontroller.js)

## Getting started

GameController.js uses JavaScript and the standard [Gamepad API](https://w3c.github.io/gamepad/) and does not have any other plugin/library dependencies.

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

| Edge | Firefox | Chrome | Safari | Opera |
| ---- | ------- | ------ | ------ | ----- |
| 12+  | 29+     | 25+    | 10.1+  | 24+   |

### Usage

Once the file is imported into the project, the object `gameControl` will be available and ready to be used.

```javascript
gameControl.on('connect', function(gamepad) {
  gamepad.on('up', moveCharacterUp);
});
```
