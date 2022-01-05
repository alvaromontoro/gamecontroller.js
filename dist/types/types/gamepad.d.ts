import type { GCDirection } from './direction';
import type { GCType } from './type';
import type { GCButtonActions } from './button-actions';
import type { GCAxisActions } from './axis-actions';
export interface GCGamepad {
    id: number;
    buttons: number;
    axes: number;
    axeValues: number[][];
    axeThreshold: number[];
    hapticActuator: GamepadHapticActuator | null;
    vibrationMode: number;
    vibration: boolean;
    mapping: GamepadMappingType;
    buttonActions: GCButtonActions;
    axesActions: GCAxisActions;
    pressed: {
        [key: string]: boolean;
    };
    set(property: string, value: any): void;
    vibrate(value: number, duration: number): Promise<boolean>;
    triggerDirectionalAction(id: GCDirection, axe: number, condition: boolean, x: number, index: number): void;
    checkStatus(): void;
    associateEvent(eventName: string, callback: () => void, type: GCType): GCGamepad | void;
    on(eventName: string, callback: () => void): GCGamepad | void;
    off(eventName: string, callback: () => void): GCGamepad | void;
    after(eventName: string, callback: () => void): GCGamepad | void;
    before(eventName: string, callback: () => void): GCGamepad | void;
}
