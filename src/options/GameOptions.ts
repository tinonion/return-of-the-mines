import { ValidatedDifficultyOptions, defaultDifficultyOptions, validateDifficultyOptions } from "./DifficultyOptions";

export interface GameOptions {
    difficultyOptions: ValidatedDifficultyOptions;
}

export type ValidatedOptions = ValidatedDifficultyOptions;

export function defaultOptions() {
    return {
        difficultyOptions: validateDifficultyOptions(defaultDifficultyOptions())
    } as GameOptions;
}
