
type KeyboardHandler = (e: KeyboardEvent, 
                        clientX: number, 
                        clientY: number) => void;

export default function createLocalizedKeyListener(keyDownTarget: KeyboardHandler, keyUpTarget: KeyboardHandler) {
    new KeyboardSentinel(keyDownTarget, keyUpTarget);
}

class KeyboardSentinel {
    mousePosition: Array<number>;
    keyDownTarget: KeyboardHandler;
    keyUpTarget: KeyboardHandler;

    constructor(keyDownTarget: KeyboardHandler, keyUpTarget: KeyboardHandler) {
        this.mousePosition = [0, 0];
        this.keyDownTarget = keyDownTarget;
        this.keyUpTarget = keyUpTarget;

        window.addEventListener("mousemove", (e: MouseEvent) => {
            this.mousePosition = [e.clientX, e.clientY];
        });

        window.addEventListener("keydown", (e: KeyboardEvent) => {
            this.keyDownTarget(e, this.mousePosition[0], this.mousePosition[1]);
        });

        window.addEventListener("keyup", (e: KeyboardEvent) => {
            this.keyUpTarget(e, this.mousePosition[0], this.mousePosition[1]);
        });
    }
}