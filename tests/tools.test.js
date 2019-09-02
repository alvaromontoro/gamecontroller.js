import { isGamepadSupported, log, error, emptyEvents } from '../src/tools';

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
});

describe('log', () => {
  it('error log works', () => {
    error('Error sentence test');
  });
});

describe('isGamepadSupported', () => {
  it('check if gamepad is supported', () => {
    const aux = isGamepadSupported();
    expect(aux).toEqual(false);
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
