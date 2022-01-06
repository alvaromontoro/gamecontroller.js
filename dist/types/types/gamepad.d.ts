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
    /** Triggered every cycle, while the button/joystick is pressed/active. */
    on(eventName: string, callback: () => void): GCGamepad | void;
    /** Triggered when button 0 is pressed. */
    on(eventName: 'button0', callback: () => void): GCGamepad | void;
    /** Triggered when button 1 is pressed. */
    on(eventName: 'button1', callback: () => void): GCGamepad | void;
    /** Triggered when button 2 is pressed. */
    on(eventName: 'button2', callback: () => void): GCGamepad | void;
    /** Triggered when button 3 is pressed. */
    on(eventName: 'button3', callback: () => void): GCGamepad | void;
    /** Triggered when button 4 is pressed. */
    on(eventName: 'button4', callback: () => void): GCGamepad | void;
    /** Triggered when button 5 is pressed. */
    on(eventName: 'button5', callback: () => void): GCGamepad | void;
    /** Triggered when button 6 is pressed. */
    on(eventName: 'button6', callback: () => void): GCGamepad | void;
    /** Triggered when button 7 is pressed. */
    on(eventName: 'button7', callback: () => void): GCGamepad | void;
    /** Triggered when button 8 is pressed. */
    on(eventName: 'button8', callback: () => void): GCGamepad | void;
    /** Triggered when button 9 is pressed. */
    on(eventName: 'button9', callback: () => void): GCGamepad | void;
    /** Triggered when button 10 is pressed. */
    on(eventName: 'button10', callback: () => void): GCGamepad | void;
    /** Triggered when button 11 is pressed. */
    on(eventName: 'button11', callback: () => void): GCGamepad | void;
    /** Triggered when button 12 is pressed. */
    on(eventName: 'button12', callback: () => void): GCGamepad | void;
    /** Triggered when button 13 is pressed. */
    on(eventName: 'button13', callback: () => void): GCGamepad | void;
    /** Triggered when button 14 is pressed. */
    on(eventName: 'button14', callback: () => void): GCGamepad | void;
    /** Triggered when button 15 is pressed. */
    on(eventName: 'button15', callback: () => void): GCGamepad | void;
    /** Triggered when button 16 is pressed. */
    on(eventName: 'button16', callback: () => void): GCGamepad | void;
    /** Triggered when the first axe/joystick is moved up. */
    on(eventName: 'up0', callback: () => void): GCGamepad | void;
    /** Triggered when the first axe/joystick is moved down. */
    on(eventName: 'down0', callback: () => void): GCGamepad | void;
    /** Triggered when the first axe/joystick is moved right. */
    on(eventName: 'right0', callback: () => void): GCGamepad | void;
    /** Triggered when the first axe/joystick is moved left. */
    on(eventName: 'left0', callback: () => void): GCGamepad | void;
    /** Triggered when the second axe/joystick is moved up. */
    on(eventName: 'up1', callback: () => void): GCGamepad | void;
    /** Triggered when the second axe/joystick is moved down. */
    on(eventName: 'down1', callback: () => void): GCGamepad | void;
    /** Triggered when the second axe/joystick is moved right. */
    on(eventName: 'right1', callback: () => void): GCGamepad | void;
    /** Triggered when the second axe/joystick is moved left. */
    on(eventName: 'left1', callback: () => void): GCGamepad | void;
    /** Triggered when Start button is pressed. This is an alias for event `button9`. */
    on(eventName: 'start', callback: () => void): GCGamepad | void;
    /** Triggered when Select button is pressed. This is an alias for event `button8`. */
    on(eventName: 'select', callback: () => void): GCGamepad | void;
    /** Triggered when Power button is pressed (e.g. the Xbox logo in an Xbox controller). This is an alias for event `button16`. */
    on(eventName: 'power', callback: () => void): GCGamepad | void;
    /** Triggered when the left back button 1 is pressed. This is an alias for event `button4`. */
    on(eventName: 'l1', callback: () => void): GCGamepad | void;
    /** Triggered when left back button 2 is pressed. This is an alias for event `button6`. */
    on(eventName: 'l2', callback: () => void): GCGamepad | void;
    /** Triggered when right back button 1 is pressed. This is an alias for event `button5`. */
    on(eventName: 'r1', callback: () => void): GCGamepad | void;
    /** Triggered when right back button 2 is pressed. This is an alias for event `button7`. */
    on(eventName: 'r2', callback: () => void): GCGamepad | void;
    /** Triggered when the main/first axe/joystick is moved up. This is an alias for event `up0`. */
    on(eventName: 'up', callback: () => void): GCGamepad | void;
    /** riggered when the main/first axe/joystick is moved down. This is an alias for event `down0`. */
    on(eventName: 'down', callback: () => void): GCGamepad | void;
    /** Triggered when the main/first axe/joystick is moved right. This is an alias for event `right0`. */
    on(eventName: 'right', callback: () => void): GCGamepad | void;
    /** Triggered when the main/first axe/joystick is moved left. This is an alias for event `left0`. */
    on(eventName: 'left', callback: () => void): GCGamepad | void;
    /** Stop to listen to the event. */
    off(eventName: string, callback: () => void): GCGamepad | void;
    /** Triggered the first cycle that a button/joystick is pressed. */
    before(eventName: string, callback: () => void): GCGamepad | void;
    /** Triggered the first cycle after a button/joystick stopped being pressed. */
    after(eventName: string, callback: () => void): GCGamepad | void;
}
