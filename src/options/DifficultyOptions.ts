import { validateRange } from "./validation";
import { Difficulty } from "./difficulty";

export interface DifficultyOptions {
    difficulty: Difficulty;
    colCount: string,
    rowCount: string,
    mineCount: string
}

export interface ValidatedDifficultyOptions {
    difficulty: Difficulty;
    colCount: number,
    rowCount: number,
    mineCount: number
}

export function defaultDifficultyOptions() {
    return {
        difficulty: Difficulty.Expert,
        colCount: "30",
        rowCount: "16",
        mineCount: "99"
    } as DifficultyOptions;
}

export function validateDifficultyOptions(options: DifficultyOptions) {
    return {
        difficulty: options.difficulty,
        colCount: validateRange(options.colCount, 1, 99, 30),
        rowCount: validateRange(options.rowCount, 1, 99, 16),
        mineCount: validateRange(options.mineCount, 0, 9999, 99),
    } as ValidatedDifficultyOptions;
}