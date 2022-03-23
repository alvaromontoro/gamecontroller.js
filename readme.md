# gameController.js

A JavaScript library that lets you handle, configure, and use gamepad and controllers on a browser.

[![Build Status](https://travis-ci.org/alvaromontoro/gamecontroller.js.svg?branch=master)](https://travis-ci.org/alvaromontoro/gamecontroller.js)
[![npm](https://img.shields.io/npm/v/gamecontroller.js.svg)](https://www.npmjs.com/package/gamecontroller.js)
[![npm](https://img.shields.io/npm/l/gamecontroller.js.svg)](https://www.npmjs.com/package/gamecontroller.js)

## Getting started

GameController.js is a lightweight library (~6KB) that uses JavaScript and the standard [Gamepad API](https://w3c.github.io/gamepad/), and does not have any plugin/library dependencies.

## Installation

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



## Usage

After importing the library into your webpage/project, `gameControl` will be available to use. This object comes with a series of properties and methods that will allow to handle the different gamepads connected to the computer. 

The connected gamepads will be stored in a list of `gamepad` objects in `gameControl`. **This `gamepad` object is not the default one returned by the browser** but a higher-level interface to interact with it and simplify its usability.

Once the file is imported into the project, the object `gameControl` will be available and ready to be used.

```javascript
gameControl.on('connect', function(gamepad) {
  gamepad.on('up', moveCharacterUp);
});
```

[Visit the Wiki for a full list of the properties, methods and events](https://github.com/alvaromontoro/gamecontroller.js/wiki) of these two objects.

### Events for gameControl

For the object `gameControl`, events are associated using the `.on()` method:

```javascript
gameControl.on('connect', gamepad => {
  console.log('A new gamepad was connected!');
});
```

Here is a list of the events that can be associated using `.on()`:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>connect</code></td>
      <td>Triggered every time that a gamepad is connected to the browser. It returns an instance of the `gamepad` object described below.</td>
    </tr>
    <tr>
      <td valign="top"><code>disconnect</code></td>
      <td>Triggered when a gamepad is disconnected from the browser.</td>
    </tr>
    <tr>
      <td valign="top"><code>beforeCycle</code></td>
      <td>Triggered before the gamepads are checked for pressed buttons/joysticks movement (before those events are triggered).</td>
    </tr>
    <tr>
      <td valign="top"><code>afterCycle</code></td>
      <td>Triggered after the gamepads are checked for pressed buttons/joysticks movement (after those events have been triggered).</td>
    </tr>
  </tbody>
</table>


### Events for gamepad

The events for the `gamepad` objects work a little bit different. The event name, is the name of the button/direction that was activated (e.g. `button0`, `up`, etc.) And there are three functions that can be used to associate event handlers for them in different situations:

- `.on()`: triggered every cycle, while the button/joystick is pressed/active.
- `.before()`: triggered the first cycle that a button/joystick is pressed.
- `.after()`: triggered the first cycle after a button/joystick stopped being pressed.

All three functions can be chained and allow two parameters: the first one is the button/direction that was activated, and the second parameter is the callback function. Example:

```javascript
gamepad.on('button0',     () => { console.log('Button 0 still pressed...'); })
       .before('button0', () => { console.log('Button 0 pressed...');       })
       .after('button0',  () => { console.log('Button 0 was released';      });
```

To see the event flow and how the different events are lined-up and interact with each other, visit the [Event Flow wikipage](../EventFlow).

Thisus

These are the _events_ that can be passed as first parameter to the event functions:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>button0</code></td>
      <td>Triggered when button 0 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button1</code></td>
      <td>Triggered when button 1 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button2</code></td>
      <td>Triggered when button 2 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button3</code></td>
      <td>Triggered when button 3 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button4</code></td>
      <td>Triggered when button 4 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button5</code></td>
      <td>Triggered when button 5 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button6</code></td>
      <td>Triggered when button 6 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button7</code></td>
      <td>Triggered when button 7 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button8</code></td>
      <td>Triggered when button 8 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button9</code></td>
      <td>Triggered when button 9 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button10</code></td>
      <td>Triggered when button 10 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button11</code></td>
      <td>Triggered when button 11 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button12</code></td>
      <td>Triggered when button 12 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button13</code></td>
      <td>Triggered when button 13 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button14</code></td>
      <td>Triggered when button 14 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button15</code></td>
      <td>Triggered when button 15 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button16</code></td>
      <td>Triggered when button 16 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>up0</code></td>
      <td>Triggered when the first axe/joystick is moved up.</td>
    </tr>
    <tr>
      <td valign="top"><code>down0</code></td>
      <td>Triggered when the first axe/joystick is moved down.</td>
    </tr>
    <tr>
      <td valign="top"><code>right0</code></td>
      <td>Triggered when the first axe/joystick is moved right.</td>
    </tr>
    <tr>
      <td valign="top"><code>left0</code></td>
      <td>Triggered when the first axe/joystick is moved left.</td>
    </tr>
    <tr>
      <td valign="top"><code>up1</code></td>
      <td>Triggered when the second axe/joystick is moved up.</td>
    </tr>
    <tr>
      <td valign="top"><code>down1</code></td>
      <td>Triggered when the second axe/joystick is moved down.</td>
    </tr>
    <tr>
      <td valign="top"><code>right1</code></td>
      <td>Triggered when the second axe/joystick is moved right.</td>
    </tr>
    <tr>
      <td valign="top"><code>left1</code></td>
      <td>Triggered when the second axe/joystick is moved left.</td>
    </tr>
    <tr>
      <td valign="top"><code>start</code></td>
      <td>Triggered when Start button is pressed.<br>This is an alias for event <code>button9</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>select</code></td>
      <td>Triggered when Select button is pressed.<br>This is an alias for event <code>button8</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>power</code></td>
      <td>Triggered when Power button is pressed (e.g. the Xbox logo in an Xbox controller).<br>This is an alias for event <code>button16</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>l1</code></td>
      <td>Triggered when the left back button 1 is pressed.<br>This is an alias for event <code>button4</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>l2</code></td>
      <td>Triggered when left back button 2 is pressed.<br>This is an alias for event <code>button6</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>r1</code></td>
      <td>Triggered when right back button 1 is pressed.<br>This is an alias for event <code>button5</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>r2</code></td>
      <td>Triggered when right back button 2 is pressed.<br>This is an alias for event <code>button7</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>up</code></td>
      <td>Triggered when the main/first axe/joystick is moved up.<br>This is an alias for event <code>up0</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>down</code></td>
      <td>Triggered when the main/first axe/joystick is moved down.<br>This is an alias for event <code>down0</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>right</code></td>
      <td>Triggered when the main/first axe/joystick is moved right.<br>This is an alias for event <code>right0</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>left</code></td>
      <td>Triggered when the main/first axe/joystick is moved left.<br>This is an alias for event <code>left0</code>.</td>
    </tr>
  </tbody>
</table>

These names are not arbitrary. They match the buttons and axes described in the [W3C Gamepad API specicification](https://w3c.github.io/gamepad/#fig-visual-representation-of-a-standard-gamepad-layout):

![https://github.com/alvaromontoro/gamecontroller.js/blob/master/public/gamepad.svg](https://github.com/alvaromontoro/gamecontroller.js/blob/master/public/gamepad.svg)


## Browser Support

| ![Edge Logo 32x32](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/56.3.2/edge/edge_32x32.png)<br>Edge | ![Firefox Logo](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/56.3.2/archive/firefox_23-56/firefox_23-56_32x32.png)<br>Firefox | ![Chrome](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/56.3.2/archive/chrome_12-48/chrome_12-48_32x32.png)<br>Chrome | ![Safari Logo](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/56.3.2/archive/safari_1-7/safari_1-7_32x32.png)<br>Safari | ![Opera logo](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/56.3.2/opera/opera_32x32.png)<br>Opera |
| ---- | ------- | ------ | ------ | ----- |
| 12+  | 29+     | 25+    | 10.1+  | 24+   |


## Examples

The `examples` folder contains different examples to showcase how to use the library. To try out the examples locally run `npm run serve` in the root of this repository or try them now directly here:

- [Connectivity](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-0-connectivity.html): shows how to detect if a gamepad was connected/disconnected.
- [Buttons and Joysticks](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-3-buttons-and-joysticks.html): see how the buttons from your gamepad map to the default gamepad.
- [SNES Controller](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-4-snes-controller.html): replica of a SNES controller (based on a previous CodePen demo).
- [Alvanoid](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-5-alvanoid.html): small Arkanoid-based game (based on a previous CodePen demo).
- [Pong](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-6-multiplayer.html): multiplayer demo with the classic game Pong for 2 players on 2 gamepads.
