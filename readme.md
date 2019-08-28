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

## API

### gameControl

After importing the library into your webpage/project, `gameControl` will be available to use. This object comes with a series of properties and methods that will allow to handle the different gamepads connected to the computer. 

#### Properties

| Name | Type | Description |
|------|------|-------------|
| `isReady` | Boolean | Specifies if the `gameControl` object is ready and managing/listening for gamepads |

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
        <b>At most one action can be associated to each event at any given moment</b>.
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
        Returns a list of the gamepads connected to the browser and managed by <code>gameControl</code>. Note that these are not browser's gamepads. but instance of `gamepad` with different properties and methods (see below section).<br>
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

## Examples

The `examples` folder contains different examples to showcase how to use the library:

- [Connectivity](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-0-connectivity.html): shows how to detect if a gamepad was connected/disconnected.
- [Buttons and Joysticks](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-3-buttons-and-joysticks.html): see how the buttons from your gamepad map to the default gamepad.
- [SNES Controller](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-4-snes-controller.html): replica of a SNES controller (based on a previous CodePen demo).
- [Alvanoid](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-5-alvanoid.html): small Arkanoid-based game (based on a previous CodePen demo).
- [Pong](https://htmlpreview.github.io/?https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-6-multiplayer.html): multiplayer demo with the classic game Pong for 2 players on 2 gamepads.
