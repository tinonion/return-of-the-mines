export enum Color {
    Primary,
    Secondary,
    Tertiary,
    None  
}

export const COLOR_MAP = new Map([
    [Color.Primary, {
        "background": "gray"
    }],
    [Color.Secondary, {
        "background": "lightgray"
    }],
    [Color.Tertiary, {
        "background": "white"
    }],
    [Color.None, {}]
]);