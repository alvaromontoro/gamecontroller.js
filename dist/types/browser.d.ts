import gameControl from './gamecontrol';
declare global {
    interface Window {
        gameControl: typeof gameControl;
    }
}
