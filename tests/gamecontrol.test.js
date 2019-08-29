import gameControl from '../src/gamecontrol';
import gamepad from '../src/gamepad';
import gamepads from './mock.gamepads';

function generateGamepads() {
  const auxGamepads = {};
  for (let x = 0; x < gamepads.length; x++) {
    auxGamepads[x] = gamepad.init(gamepads[x]);
  }
  gameControl.gamepads = auxGamepads;
}

describe('gameControl', () => {
  test('Check gameControl gamepads', () => {
    expect(gameControl.gamepads).toEqual({});
    expect(gameControl.getGamepads()).toEqual({});
    expect(gameControl.getGamepad(0)).toEqual(null);
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
});
