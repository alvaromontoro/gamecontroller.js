import type { GCGamepad } from './gamepad';
import type { GCGamepads } from './gamepads';
import type { GCConnectCallback } from './connect-callback';
import type { GCDisconnectCallback } from './disconnect-callback';
import type { GCCallback } from './callback';

export interface GameControl {
  gamepads: GCGamepads;
  axeThreshold: number[];
  isReady: boolean;
  onConnect: GCConnectCallback;
  onDisconnect: GCDisconnectCallback;
  onBeforeCycle: GCCallback;
  onAfterCycle: GCCallback;
  getGamepads: () => GCGamepads;
  getGamepad: (id: number) => GCGamepad | null;
  set: (property: string, value: any) => void;
  checkStatus: () => void;
  init: () => void;
  on(eventName: 'connect', callback: GCConnectCallback): any;
  on(eventName: 'disconnect', callback: GCDisconnectCallback): any;
  on(eventName: string, callback: GCCallback): any;
  off(eventName: string): any;
};