// This file is the entry point for browsers, this file set's the global window.gameControl object
import { error, isGamepadSupported } from './tools';
import { MESSAGES } from './constants';
import gameControl from './gamecontrol';

declare global {
  interface Window {
    gameControl: typeof gameControl;
  }
}

if (isGamepadSupported()) {
  window.gameControl = gameControl;
} else {
  error(MESSAGES.NO_SUPPORT);
}

export { gameControl, isGamepadSupported, MESSAGES }
export default gameControl;
