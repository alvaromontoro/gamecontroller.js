import { isGamepadSupported, log, error, emptyEvents } from '../src/tools';
import { gamepads } from './mock.gamepads';

describe('log', () => {
  it('log works without parameters', () => {
    log('Sentence test');
  });

  it('error log works', () => {
    log('Error sentence test', 'error');
  });

  it('log works with different parameters', () => {
    log('Info sentence test', 'info');
    log('Log sentence test', 'log');
  });

  it('error log works', () => {
    error('Error sentence test');
  });

  it('branch test console and error', () => {
    const auxconsole = console;
    console = null;
    log('Console sentence test');
    log('Error sentence test', 'error');
    log('Info sentence test', 'info');
    log('Info sentence test', 'log');
    error('Error sentence test');
    console = auxconsole;
  });
});

describe('isGamepadSupported', () => {
  it('check if gamepad is supported', () => {
    const aux = isGamepadSupported();
    expect(aux).toEqual(false);
  });

  it('check if gamepad is supported', () => {
    const mockGamepads = () => gamepads;
    global.navigator.getGamepads = mockGamepads;
    const aux1 = isGamepadSupported();
    expect(aux1).toEqual(true);

    global.navigator.getGamepads = 'error';
    const aux2 = isGamepadSupported();
    expect(aux2).toEqual(false);
  });

  it('check if gamepad is supported (webkit)', () => {
    const webkitGetGamepads = () => gamepads;
    global.navigator.webkitGetGamepads = webkitGetGamepads;
    const aux = isGamepadSupported();
    expect(aux).toEqual(true);

    global.navigator.webkitGetGamepads = 'error';
    const aux2 = isGamepadSupported();
    expect(aux2).toEqual(false);
  });
});

describe('emptyEvents', () => {
  it('check all events return to be an object', () => {
    const aux = emptyEvents();
    expect(typeof aux).toEqual('object');
    expect(typeof aux.action).toEqual('function');
    expect(typeof aux.before).toEqual('function');
    expect(typeof aux.after).toEqual('function');
  });
});
