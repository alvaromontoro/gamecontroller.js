// This file is the entry point
import { error, isGamepadSupported } from './tools';
import gameControl from './gamecontrol';

if (isGamepadSupported()) {
  window.gameControl = gameControl;
} else {
  error('Your web browser does not support the Gamepad API.');
}
