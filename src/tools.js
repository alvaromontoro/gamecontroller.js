const log = (message, type = 'log') => {
  if (type === 'error') {
    if (console && typeof console.error === 'function') console.error(message);
  } else {
    if (console && typeof console.log === 'function') console.log(message);
  }
};

const error = message => log(message, 'error');

const isGamepadSupported = () =>
  (navigator.getGamepads && typeof navigator.getGamepads === 'function') ||
  (navigator.getGamepads && typeof navigator.webkitGetGamepads === 'function');

const emptyEvents = () => ({ action: () => {} });

export { isGamepadSupported, log, error, emptyEvents };
