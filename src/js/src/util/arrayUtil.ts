export function areEqual<T>(first: Array<T>, second: Array<T>) {
    if (first.length !== second.length) { return false; }

    for (let i = 0; i < first.length; i++) {
        if (first[i] !== second[i]) {
            return false;
        }
    }

    return true;
}