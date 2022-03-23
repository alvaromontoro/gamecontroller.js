declare const log: (message: string, type?: string) => void;
declare const error: (message: string) => void;
declare const isGamepadSupported: () => boolean;
declare const emptyEvents: () => {
    action: () => void;
    after: () => void;
    before: () => void;
};
export { isGamepadSupported, log, error, emptyEvents };
