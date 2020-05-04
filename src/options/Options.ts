import { Difficulty } from "./difficulty";

export interface Options {
    difficulty: Difficulty;
    colCount: number,
    rowCount: number,
    mineCount: number
}

export type OptionPair = [keyof Options, string | Difficulty];

export function defaultOptions() {
    return {
        difficulty: Difficulty.Expert,
        colCount: 30,
        rowCount: 16,
        mineCount: 99
    } as Options;
}
