import { isGamepadSupported } from './tools';
import { MESSAGES } from './constants';
import gameControl from './gamecontrol';
declare global {
    interface Window {
        gameControl: typeof gameControl;
    }
}
export { gameControl, isGamepadSupported, MESSAGES };
export default gameControl;
