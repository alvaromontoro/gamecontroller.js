const log = (message, type = 'log') => {
  const c = console;
  if (type === 'error') {
    if (c && typeof c.error === 'function') c.error(message);
  } else {
    if (c && typeof c.info === 'function') c.info(message);
  }
};

const error = message => log(message, 'error');

const isGamepadSupported = () =>
  (navigator.getGamepads && typeof navigator.getGamepads === 'function') ||
  (navigator.getGamepads && typeof navigator.webkitGetGamepads === 'function');

export { isGamepadSupported, log, error };
