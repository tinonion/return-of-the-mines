export interface DisplayOptions {
    showMineCount: boolean,
    showTimer: boolean,
    scaleFactor: string
}

export function defaultDisplayOptions() {
    return {
        showMineCount: true,
        showTimer: true,
        scaleFactor: "100"
    } as DisplayOptions;
}