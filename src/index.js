// This file is the entry point
import { log, isGamepadSupported } from './tools';
import gameControl from './gamecontrol';

if (isGamepadSupported()) {
  window.gameControl = gameControl;
} else {
  log('Your web browser does not support the Gamepad API.', 'error');
}
