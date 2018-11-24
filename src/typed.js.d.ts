declare module 'typed.js';

export interface TypedOptions {
    strings?: string[];
    stringsElement?: string;
    typeSpeed?: number;
    startDelay?: number;
    backSpeed?: number;
    smartBackspace?: boolean;
    shuffle?: boolean;
    backDelay?: number;
    fadeOut?: boolean;
    fadeOutClass?: string;
    fadeOutDelay?: number;
    loop?: boolean;
    loopCount?: number;
    showCursor?: boolean;
    cursorChar?: string;
    autoInsertCss?: boolean;
    attr?: string;
    bindInputFocusEvents?: boolean;
    contentType?: string;
    onComplete?(): void;
    preStringTyped?(arrayPos: number): void;
    onStringTyped?(arrayPos: number): void;
    onLastStringBackspaced?(): void;
    onTypingPaused?(arrayPos: number): void;
    onTypingResumed?(arrayPos: number): void;
    onReset?(arrayPos: number): void;
    onStop?(): void;
    onStart?(): void;
    onDestroy?(): void;
}

export default class Typed {
    constructor(elementId: string, options: TypedOptions);

    toggle(): void;
    stop(): void;
    start(): void;
    destroy(): void;
    reset(restart: boolean): void;
}
