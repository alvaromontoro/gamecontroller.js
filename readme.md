# gameController.js

A JavaScript library that lets you handle, configure, and use gamepad and controllers on a browser.

[![Build Status](https://travis-ci.org/alvaromontoro/gamecontroller.js.svg?branch=master)](https://travis-ci.org/alvaromontoro/gamecontroller.js)
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

---------

## API

### gameControl

After importing the library into your webpage/project, `gameControl` will be available to use. This object comes with a series of properties and methods that will allow to handle the different gamepads connected to the computer. 

#### Properties

| Name | Type | Description |
|------|------|-------------|
| `isReady` | Boolean | Specifies if the `gameControl` object is ready and listening for gamepads, or managing already connected ones |

#### Methods

<table>
  <thead>
    <tr>
      <th>Name and Parameters</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>.on(EVENTNAME, CALLBACK)</code></td>
      <td>
        Associates a function (callback) to be executed when the specified event is triggered (see list of events below).<br>
        Example of use:<br><br>
        <pre><code>gameControl.on("connect", function() {
  console.log("gamepad connected!")
})</code></pre><br/>
        At most one action can be associated to each event at any given moment.
      </td>
    </tr>
    <tr>
      <td valign="top"><code>.off(EVENTNAME)</code></td>
      <td>
        Deassociates the event handler, so no action is performed when the event is triggered.<br>
        Example of use:<br><br>
        <pre><code>gameControl.off("connect");</code></pre>
      </td>
    </tr>
    <tr>
      <td valign="top"><code>.getGamepad(ID)</code></td>
      <td>
        Returns the gamepad associated to the provided ID or <code>null</code> if none exist. Note that this is not the browser's gamepad, but a <code>gamepad</code> object with different properties and methods (see below section).<br>
        Example of use:<br><br>
        <pre><code>const myGamepad = gameControl.getGamepad(0);</code></pre>
      </td>
    </tr>
    <tr>
      <td valign="top"><code>.getGamepads()</code></td>
      <td>
        Returns a list of the gamepads connected to the browser and managed by <code>gameControl</code>. Note that these are not browser's gamepads. but instance of <code>gamepad</code> with different properties and methods (see below section).<br>
        Example of use:<br><br>
        <pre><code>gameControl.getGamepads();</code></pre>
      </td>
    </tr>
  </tbody>
</table>
  

#### Associated Events

This is a list of the events that can be associated to `gameController` itself.

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


### gamepad

The connected gamepads will be stored in a list of `gamepad` objects. This `gamepad` is not the default one returned by the browser but an interface to interact with it and simplify its usability.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>id</code></td>
      <td valign="top">String</td>
      <td>ID of the controller.</td>
    </tr>
    <tr>
      <td valign="top"><code>buttons</code></td>
      <td valign="top">Integer</td>
      <td>Number of buttons available on the gamepad.</td>
    </tr>
    <tr>
      <td valign="top"><code>axes</code></td>
      <td valign="top">Integer</td>
      <td>Number of axes/joysticks available on the gamepad.<br>Notice that in some cases, what may seem like directional buttons are in reality a joystick.</td>
    </tr>
    <tr>
      <td valign="top"><code>mapping</code></td>
      <td valign="top">String</td>
      <td>
      Indicates if the gamepad matches the standard gamepad layout specified in the <a href="https://w3c.github.io/gamepad/#fig-visual-representation-of-a-standard-gamepad-layout">W3C definition</a>.<br>
        Possible values <code>"standard"</code> or <code>""</code>. <br><br>
        <strong>If the value is <code>""</code>, developers may want to prompt a remap option to the users, as the buttons may not match the default ones displayed below.</strong>.
      </td>
    </tr>
  </tbody>
</table>

#### Methods

<table>
  <thead>
    <tr>
      <th>Name and Parameters</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>.on(EVENTNAME, CALLBACK)</code></td>
      <td>
        Associates a function (callback) to be executed when the specified event is triggered (see list of events below).<br>
        Example of use:<br><br>
        <pre><code>gamepad.on("start", function() {
  console.log("Start button was pressed!")
})</code></pre><br/>
        At most one action can be associated to each event at any given moment.
      </td>
    </tr>
    <tr>
      <td valign="top"><code>.off(EVENTNAME)</code></td>
      <td>
        Deassociates the event handler, so no action is performed when the event is triggered.<br>
        Example of use:<br><br>
        <pre><code>gamepad.off("select");</code></pre>
      </td>
    </tr>
  </tbody>
</table>
  

#### Associated Events

This is a list of the events that can be associated to the `gamepad` object. They are the name of the button or directional joystick that will trigger the event when pressed/moved. 

Not all events will be available in all the gamepads. E.g. if a gamepad only has 10 buttons, the events for button 11-16 will never be triggered. Also, aliases will work in `"standard"` gamepads (see properties above), but may not work as expected on non-standard gamepads.

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


-----------

## Examples

The `examples` folder contains different examples to showcase how to use the library:

- [Connectivity](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-0-connectivity.html): shows how to detect if a gamepad was connected/disconnected.
- [Buttons and Joysticks](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-3-buttons-and-joysticks.html): see how the buttons from your gamepad map to the default gamepad.
- [SNES Controller](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-4-snes-controller.html): replica of a SNES controller (based on a previous CodePen demo).
- [Alvanoid](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-5-alvanoid.html): small Arkanoid-based game (based on a previous CodePen demo).
- [Pong](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-6-multiplayer.html): multiplayer demo with the classic game Pong for 2 players on 2 gamepads.
