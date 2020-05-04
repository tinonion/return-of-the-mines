import { OptionFields } from "./OptionFields";
import { Options } from "./Options";

function validateRange(input: string, min: number, max: number, defaultValue: number): number {
    const num = parseInt(input);

    if (isNaN(num)) {
        return defaultValue;
    }

    if (num > max) {
        return max;

    } else if (num < min) {
        return min;

    } else {
        return num;
    }
}

export function validateOptions(optionFields: OptionFields): Options {
    return {
        difficulty: optionFields.difficulty,
        colCount: validateRange(optionFields.colCount, 1, 99, 30),
        rowCount: validateRange(optionFields.rowCount, 1, 99, 16),
        mineCount: validateRange(optionFields.mineCount, 0, 9999, 99)
    } as Options;
}