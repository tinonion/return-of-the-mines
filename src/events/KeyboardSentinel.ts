
type KeyboardHandler = (e: KeyboardEvent, 
                        clientX: number, 
                        clientY: number) => void;

function propagateKeyDown(e: KeyboardEvent, 
                          targets: Array<KeyboardHandler>,
                          mouseX: number,
                          mouseY: number) 
{
    for (let i = 0; i < targets.length; i++) {
        targets[i](e, mouseX, mouseY);     
    }
}

export class KeyboardSentinel {
    mousePosition: Array<number>;
    targets: Array<KeyboardHandler>;

    constructor() {
        this.mousePosition = [0, 0];
        this.targets = [];

        window.addEventListener("mousemove", (e: MouseEvent) => {
            this.mousePosition = [e.clientX, e.clientY];
        });

        window.addEventListener("keydown", (e: KeyboardEvent) => {
            propagateKeyDown(e, this.targets, this.mousePosition[0], this.mousePosition[1]);
        });
    }

    addTarget(newTarget: KeyboardHandler) {
        this.targets.push(newTarget);
    }
}