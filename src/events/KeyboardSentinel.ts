
type KeyboardHandler = (e: KeyboardEvent, 
                        clientX: number, 
                        clientY: number) => void;

export default function createLocalizedKeyListener(target: KeyboardHandler) {
    new KeyboardSentinel(target);
}

class KeyboardSentinel {
    mousePosition: Array<number>;
    target: KeyboardHandler;

    constructor(target: KeyboardHandler) {
        this.mousePosition = [0, 0];
        this.target = target;

        window.addEventListener("mousemove", (e: MouseEvent) => {
            this.mousePosition = [e.clientX, e.clientY];
        });

        window.addEventListener("keydown", (e: KeyboardEvent) => {
            this.target(e, this.mousePosition[0], this.mousePosition[1]);
        });
    }
}