export function randIntInRange(min: number, max: number) {
    // beginning inclusive, end exclusive
    return Math.floor(Math.random() * Math.floor(max - min)) + min;
}