export function validateRange(input: string, min: number, max: number): number {
    const num = parseInt(input);

    if (isNaN(num)) {
        return NaN;
    }

    if (num > max) {
        return max;

    } else if (num < min) {
        return min;

    } else {
        return num;
    }
}