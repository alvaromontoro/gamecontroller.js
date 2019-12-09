import gamepad from '../src/gamepad';
import { gamepads, gamepadsFirefox } from './mock.gamepads';

describe('gamepad', () => {
  test('Check default values (17-button gamepad)', () => {
    const gp = gamepad.init(gamepads[0]);
    expect(gp.id).toEqual(0);
    expect(gp.buttons).toEqual(17);
    expect(gp.axes).toEqual(2);
    expect(gp.mapping).toEqual('standard');
    expect(Object.keys(gp.buttonActions).length).toEqual(gp.buttons);
    expect(Object.keys(gp.axesActions).length).toEqual(gp.axes);
  });

  test('Check default values (10-button gamepad)', () => {
    const gp = gamepad.init(gamepads[1]);
    expect(gp.id).toEqual(1);
    expect(gp.buttons).toEqual(10);
    expect(gp.axes).toEqual(1);
    expect(gp.mapping).toEqual('');
    expect(Object.keys(gp.buttonActions).length).toEqual(gp.buttons);
    expect(Object.keys(gp.axesActions).length).toEqual(gp.axes);
  });

  test('Check button pressed (manual)', () => {
    const gp = gamepad.init(gamepads[0]);
    const message = 'Button0 pressed';
    gp.on('button0', function() {
      return message;
    });
    expect(gp.buttonActions[0].action()).toEqual(message);
  });

  test('Verify sensitivity threshold', () => {
    const gp = gamepad.init(gamepads[0]);
    expect(gp.axeThreshold[0]).toEqual(1.0);
    gp.set('axeThreshold', [0.3]);
    expect(gp.axeThreshold[0]).toEqual(0.3);
    gp.set('axeThreshold', [12.0]); // invalid value
    expect(gp.axeThreshold[0]).toEqual(0.3);
  });

  test('set invalid property', () => {
    const gp = gamepad.init(gamepads[0]);
    gp.set('invalidProperty', true);
  });

  test('Vibration in Chrome', () => {
    const gp = gamepad.init(gamepads[0]);
    expect(gp.vibrate(0.5, 500)).toEqual('dual-rumble - 500');
    expect(gp.vibrate()).toEqual('dual-rumble - 500');
  });

  // this case should never happen
  test('Vibration in Chrome (no vibration)', () => {
    const gp = gamepad.init(gamepads[2]);
    expect(gp.vibrate(0.5, 500)).toEqual(undefined);
  });

  test('Vibration in Firefox', () => {
    const gp = gamepad.init(gamepadsFirefox[0]);
    expect(gp.vibrate(0.5, 500)).toEqual('vibrate at 0.5 for 500ms');
  });

  test('Vibration in Firefox (no vibration)', () => {
    const gp = gamepad.init(gamepadsFirefox[1]);
    expect(gp.vibrate(0.5, 500)).toEqual(undefined);
  });

  // this case should never happen
  test('Vibration in Firefox (wrong type)', () => {
    const gp = gamepad.init(gamepadsFirefox[3]);
    expect(gp.vibrate(0.5, 500)).toEqual(undefined);
  });

  test('Vibration in Firefox (array of actuators)', () => {
    const gp = gamepad.init(gamepadsFirefox[2]);
    expect(gp.vibrate(0.5, 500)).toEqual('vibrate at 0.5 for 500ms');
  });

  test('after event', () => {
    const gp = gamepad.init(gamepads[0]);
    gp.after('button0', function() {
      return 'button0 released';
    });
    expect(gp.buttonActions[0].after()).toEqual('button0 released');
  });

  test('on event', () => {
    const gp = gamepad.init(gamepads[0]);
    gp.on('button0', function() {
      return 'button0 is on';
    });
    expect(gp.buttonActions[0].action()).toEqual('button0 is on');
  });

  test('on wrong event', () => {
    const gp = gamepad.init(gamepads[0]);
    gp.on('fakeevent', () => {});
  });

  test('before event', () => {
    const gp = gamepad.init(gamepads[0]);
    gp.before('button0', function() {
      return 'button0 pressed';
    });
    expect(gp.buttonActions[0].before()).toEqual('button0 pressed');
  });

  test('off event', () => {
    const gp = gamepad.init(gamepads[0]);
    gp.on('button0', function() {
      return 'button0 is on';
    });
    expect(gp.buttonActions[0].action()).toEqual('button0 is on');
    gp.off('button0');
    expect(gp.buttonActions[0].action()).toEqual(undefined);
  });

  test('on directional event', () => {
    const gp = gamepad.init(gamepads[0]);
    gp.on('up0', function() {
      return 'up0 is on';
    });
    expect(gp.axesActions[0].up.action()).toEqual('up0 is on');
    gp.off('up0');
    expect(gp.axesActions[0].up.action()).toEqual(undefined);
  });

  test('on directional event (alias)', () => {
    const gp = gamepad.init(gamepads[0]);
    gp.on('up', function() {
      return 'up is on';
    });
    expect(gp.axesActions[0].up.action()).toEqual('up is on');
    gp.off('up');
    expect(gp.axesActions[0].up.action()).toEqual(undefined);
  });

  test('on directional event (incorrect)', () => {
    const gp = gamepad.init(gamepads[0]);
    gp.on('up4', function() {
      return 'up4 is on';
    });
  });

  test('on button aliases', () => {
    const gp = gamepad.init(gamepads[0]);
    gp.on('select', () => 'select')
      .on('start', () => 'start')
      .on('l1', () => 'l1')
      .on('l2', () => 'l2')
      .on('r1', () => 'r1')
      .on('r2', () => 'r2')
      .on('power', () => 'power');

    expect(gp.buttonActions[8].action()).toEqual('select');
    expect(gp.buttonActions[9].action()).toEqual('start');
    expect(gp.buttonActions[4].action()).toEqual('l1');
    expect(gp.buttonActions[5].action()).toEqual('r1');
    expect(gp.buttonActions[6].action()).toEqual('l2');
    expect(gp.buttonActions[7].action()).toEqual('r2');
    expect(gp.buttonActions[16].action()).toEqual('power');
  });

  test('on button power when no button power', () => {
    const gp = gamepad.init(gamepads[1]);
    gp.on('power', () => 'power');
  });

  test('on button outside of range', () => {
    const gp = gamepad.init(gamepads[1]);
    gp.on('button1234', () => 'event on incorrect button');
  });

  test('cycle check status', () => {
    const gp = gamepad.init(gamepads[1]);
    const mockGamepads = () => gamepads;
    global.navigator.getGamepads = mockGamepads;
    gp.checkStatus();
    gamepads[1].buttons[0].pressed = false;
    gamepads[1].axes[0] = 0.0;
    gp.checkStatus();
  });

  // this should not happen
  test('cycle check status (no axes)', () => {
    const gp = gamepad.init(gamepads[2]);
    gamepads[2].axes = null;
    gamepads[2].buttons = null;
    const mockGamepads = () => gamepads;
    global.navigator.getGamepads = mockGamepads;
    gp.checkStatus();

    global.navigator.getGamepads = null;
    global.navigator.webkitGetGamepads = mockGamepads;
    gp.checkStatus();
  });
});
