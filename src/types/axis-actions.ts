import type { GCAction } from './action';

export interface GCAxisActions {
  [id: number]: {
    down: GCAction;
    left: GCAction;
    right: GCAction;
    up: GCAction;
  };
}
