import { GCGamepads } from './types/gamepads';
import { GCGamepad } from './types/gamepad';
declare global {
    interface Window {
        gamepads: {
            [id: number]: Gamepad;
        };
    }
}
declare const gameControl: {
    gamepads: GCGamepads;
    axeThreshold: number[];
    isReady: boolean;
    onConnect: (_gamepad: GCGamepad) => void;
    onDisconnect: (_index: number) => void;
    onBeforeCycle: () => void;
    onAfterCycle: () => void;
    getGamepads: () => GCGamepads;
    getGamepad: (id: number) => GCGamepad | null;
    set: (property: string, value: any) => void;
    checkStatus: () => void;
    init: () => void;
    on: (eventName: string, callback: () => void) => any;
    off: (eventName: string) => any;
};
export default gameControl;
