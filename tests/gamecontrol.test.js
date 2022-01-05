/**
 * @jest-environment jsdom
 */

import gameControl from '../dist/cjs/gamecontrol';
import gamepad from '../dist/cjs/gamepad';
import { gamepads } from './mock.gamepads';

function generateGamepads() {
  const auxGamepads = {};
  for (let x = 0; x < gamepads.length; x++) {
    auxGamepads[x] = gamepad.init(gamepads[x]);
    auxGamepads[x].set('axeThreshold', gameControl.axeThreshold);
  }
  gameControl.gamepads = auxGamepads;
}

describe('gameControl', () => {
  // these cases should probably not happen but should fail gracefully
  test('Check status when nothing has been connected yet', () => {
    global.webkitRequestAnimationFrame = global.requestAnimationFrame;
    global.requestAnimationFrame = null;
    gameControl.checkStatus();
    global.requestAnimationFrame = global.webkitRequestAnimationFrame;
  });

  test('Check gameControl gamepads', () => {
    expect(gameControl.gamepads).toEqual({});
    expect(gameControl.getGamepads()).toEqual({});
    expect(gameControl.getGamepad(0)).toEqual(null);
  });

  test('trigger event gamepadconnected', () => {
    const event = new CustomEvent('gamepadconnected', {
      detail: { gamepad: gamepads[0] },
      gamepad: gamepads[0]
    });
    global.dispatchEvent(event);
  });

  test('trigger event gamepaddisconnected', () => {
    const event = new CustomEvent('gamepaddisconnected', {
      detail: { gamepad: gamepads[0] }
    });
    global.dispatchEvent(event);
  });

  // this definitely should not happen
  test('trigger event gamepadconnected (no gamepad)', () => {
    const event = new CustomEvent('gamepadconnected', {
      detail: {}
    });
    global.dispatchEvent(event);
  });

  // this should not happen
  test('trigger event gamepaddisconnected (no gamepad)', () => {
    const event = new CustomEvent('gamepaddisconnected', {
      detail: {}
    });
    global.dispatchEvent(event);
  });

  test('trigger event gamepadconnected for three gamepads', () => {
    const event = new CustomEvent('gamepadconnected', {
      detail: { gamepad: gamepads[0] },
      gamepad: gamepads[0]
    });
    global.dispatchEvent(event);

    const event2 = new CustomEvent('gamepadconnected', {
      detail: { gamepad: gamepads[1] },
      gamepad: gamepads[1]
    });
    global.dispatchEvent(event2);

    // this probably shouldn't happen
    const event3 = new CustomEvent('gamepadconnected', {
      detail: { gamepad: gamepads[0] },
      gamepad: gamepads[0]
    });
    global.dispatchEvent(event3);
  });

  test('Function getGamepads()', () => {
    generateGamepads();
    const gamepadList = gameControl.getGamepads();
    expect(Object.keys(gamepadList).length).toEqual(gamepads.length);
  });

  test('Function getGamepad(id)', () => {
    generateGamepads();
    const gp = gameControl.getGamepad(0);
    expect(gp.id).toEqual(0);
    expect(gp.mapping).toEqual('standard');
  });

  test('Function getGamepad(id) incorrect id', () => {
    generateGamepads();
    const gp = gameControl.getGamepad(100);
    expect(gp).toEqual(null);
  });

  test('Verify sensitivity threshold', () => {
    generateGamepads();
    const gp = gameControl.getGamepad(0);
    expect(gp.axeThreshold[0]).toEqual(1.0);
    gp.set('axeThreshold', [0.3]);
    expect(gp.axeThreshold[0]).toEqual(0.3);
  });

  test('Verify sensitivity threshold', () => {
    gameControl.axeThreshold = [0.5];
    generateGamepads();
    const gp = gameControl.getGamepad(0);
    expect(gp.axeThreshold[0]).toEqual(0.5);
    gp.set('axeThreshold', [0.3]);
    expect(gp.axeThreshold[0]).toEqual(0.3);
    gameControl.axeThreshold = [0.5];
    expect(gp.axeThreshold[0]).toEqual(0.3);
  });

  test('event associattion and deassociation', () => {
    gameControl
      .on('connect', () => 'gamepad connected')
      .on('disconnect', () => 'gamepad disconnected')
      .on('beforecycle', () => 'before cycle')
      .on('aftercycle', () => 'after cycle')
      .on('afterCycle', () => 'after Cycle')
      .on('beforeCycle', () => 'before Cycle');

    expect(gameControl.onConnect()).toEqual('gamepad connected');

    gameControl
      .off('connect')
      .off('disconnect')
      .off('beforecycle')
      .off('aftercycle')
      .off('afterCycle')
      .off('beforeCycle');

    expect(gameControl.onConnect()).toEqual(undefined);
  });

  test('event association/deassociation of unknown event', () => {
    gameControl.on('invalidEvent', () => 'invalid event');
    gameControl.off('invalidEvent');
  });

  test('checkStatus', () => {
    generateGamepads();
    gameControl.checkStatus();
  });

  test('set invalid property', () => {
    gameControl.set('invalidProperty', true);
  });

  test('set axeThreshold', () => {
    gameControl.set('axeThreshold', [1.0]);
    expect(gameControl.axeThreshold[0]).toEqual(1.0);
    gameControl.set('axeThreshold', [0.5]);
    expect(gameControl.axeThreshold[0]).toEqual(0.5);
    gameControl.set('axeThreshold', [10.5]);
    expect(gameControl.axeThreshold[0]).toEqual(0.5);
  });
});
