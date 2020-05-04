import { Difficulty } from "./difficulty";

export interface OptionFields {
    difficulty: Difficulty;
    colCount: string,
    rowCount: string,
    mineCount: string
}

export type OptionPair = [keyof OptionFields, string | Difficulty];

export function defaultOptionFields() {
    return {
        difficulty: Difficulty.Expert,
        colCount: "30",
        rowCount: "16",
        mineCount: "99"
    } as OptionFields;
}
