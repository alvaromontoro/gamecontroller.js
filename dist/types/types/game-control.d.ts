import type { GCGamepad } from './gamepad';
import type { GCGamepads } from './gamepads';
import type { GCConnectCallback } from './connect-callback';
import type { GCDisconnectCallback } from './disconnect-callback';
import type { GCCallback } from './callback';
export interface GameControl {
    gamepads: GCGamepads;
    axeThreshold: number[];
    isReady: boolean;
    /** Triggered every time that a gamepad is connected to the browser. It returns an instance of the `gamepad` object described below. */
    onConnect: GCConnectCallback;
    /** Triggered when a gamepad is disconnected from the browser. */
    onDisconnect: GCDisconnectCallback;
    /** Triggered before the gamepads are checked for pressed buttons/joysticks movement (before those events are triggered). */
    onBeforeCycle: GCCallback;
    /** Triggered after the gamepads are checked for pressed buttons/joysticks movement (after those events have been triggered). */
    onAfterCycle: GCCallback;
    getGamepads: () => GCGamepads;
    getGamepad: (id: number) => GCGamepad | null;
    set: (property: string, value: any) => void;
    checkStatus: () => void;
    init: () => void;
    /** Triggered every time that a gamepad is connected to the browser. It returns an instance of the `gamepad` object described below. */
    on(eventName: 'connect', callback: GCConnectCallback): GameControl;
    /** Triggered when a gamepad is disconnected from the browser. */
    on(eventName: 'disconnect', callback: GCDisconnectCallback): GameControl;
    /** Triggered before the gamepads are checked for pressed buttons/joysticks movement (before those events are triggered). */
    on(eventName: 'beforeCycle', callback: GCCallback): GameControl;
    /** Triggered after the gamepads are checked for pressed buttons/joysticks movement (after those events have been triggered). */
    on(eventName: 'afterCycle', callback: GCCallback): GameControl;
    on(eventName: string, callback: GCCallback): GameControl;
    off(eventName: string): GameControl;
}
