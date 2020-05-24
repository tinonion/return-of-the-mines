export enum Color {
    DeepBackground,
    ShallowBackground,
    Foreground,
    Unselected,
    Selected,
    Disabled,
    Enabled,
    None  
}

export const COLOR_MAP = new Map([
    [Color.DeepBackground, {
        "background": "lightgray"
    }],
    [Color.ShallowBackground, {
        "background": "gray"
    }],
    [Color.Foreground, {
        "background": "white"
    }],
    [Color.Unselected, {
        "background": "white"
    }],
    [Color.Selected, {
        "background": "lightgray"
    }],
    [Color.Disabled, {
        "background": "lightgray"
    }],
    [Color.Enabled, {
        "background": "white"
    }],
    [Color.None, {}]
]);