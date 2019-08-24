// This file is the entry point
import { log, isGamepadSupported } from './tools';

if (isGamepadSupported()) {
  log('Gamepad.js ready to use');
} else {
  log('Your web browser does not support the Gamepad API.', 'error');
}
