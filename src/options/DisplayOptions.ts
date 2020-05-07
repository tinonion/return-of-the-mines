export interface DisplayOptions {
    showMineCount: boolean,
    showTimer: boolean
}

export function defaultDisplayOptions() {
    return {
        showMineCount: true,
        showTimer: true
    } as DisplayOptions;
}