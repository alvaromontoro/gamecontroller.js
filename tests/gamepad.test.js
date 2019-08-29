import gamepad from '../src/gamepad';
import gamepads from './mock.gamepads';

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
});
