// This file is the entry point for modules, use this if you do not want to set the global window.gameControl object
export * from './types'; 
export { isGamepadSupported } from './tools';
export { MESSAGES } from './constants';
import gameControl from './gamecontrol';

export { gameControl, }
export default gameControl;
