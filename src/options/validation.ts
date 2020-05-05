export function validateRange(input: string, min: number, max: number, defaultValue: number): number {
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