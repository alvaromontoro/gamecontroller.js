const log = (message: string, type = 'log') => {
  if (type === 'error') {
    if (console && typeof console.error === 'function') console.error(message);
  } else {
    if (console && typeof console.info === 'function') console.info(message);
  }
};

const error = (message: string) => log(message, 'error');

const isGamepadSupported = () =>
  (navigator.getGamepads && (typeof navigator.getGamepads === 'function') ||
  (typeof (navigator as any).webkitGetGamepads === 'function')) ||
  false;

const emptyEvents = () => ({ action: () => {}, after: () => {}, before: () => {} });

export { isGamepadSupported, log, error, emptyEvents };
