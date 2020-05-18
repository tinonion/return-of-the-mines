export interface DisplayOptions {
    showMineCount: boolean,
    showTimer: boolean,
    scaleFactor: string,
    boardShift: string
}

export function defaultDisplayOptions() {
    return {
        showMineCount: true,
        showTimer: true,
        scaleFactor: "100",
        boardShift: "0"
    } as DisplayOptions;
}