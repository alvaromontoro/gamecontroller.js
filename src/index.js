// This file is the entry point
import { error, isGamepadSupported } from './tools';
import { MESSAGE } from './constants';
import gameControl from './gamecontrol';

if (isGamepadSupported()) {
  window.gameControl = gameControl;
} else {
  error(MESSAGE.NO_SUPPORT);
}
