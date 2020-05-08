export default interface ProgressInterface {
    markMine: VoidFunction,
    unmarkMine: VoidFunction,
    resetGame: VoidFunction,
    startGame: VoidFunction,
    endGame: VoidFunction,
}

export function defaultProgressInterface() {
    return {
        markMine: () => {},
        unmarkMine: () => {},
        resetGame: () => {},
        startGame: () => {},
        endGame: () => {} 
    } as ProgressInterface;
}