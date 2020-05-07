import { ValidatedDifficultyOptions, defaultDifficultyOptions, validateDifficultyOptions } from "./DifficultyOptions";
import { DisplayOptions, defaultDisplayOptions } from "./DisplayOptions";

export interface GameOptions {
    difficultyOptions: ValidatedDifficultyOptions;
    displayOptions: DisplayOptions;
}

export type ValidatedOptions = ValidatedDifficultyOptions | DisplayOptions;

export function defaultOptions() {
    return {
        difficultyOptions: validateDifficultyOptions(defaultDifficultyOptions()),
        displayOptions: defaultDisplayOptions()
    } as GameOptions;
}
