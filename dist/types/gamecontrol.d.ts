import type { GameControl } from './types';
declare global {
    interface Window {
        gamepads: {
            [id: number]: Gamepad;
        };
    }
}
declare const gameControl: GameControl;
export default gameControl;
