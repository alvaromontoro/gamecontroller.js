// This file is the entry point
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
