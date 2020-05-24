import { CSSProperties } from "react";

function getFontStyle(size: number) {
    return {
        fontFamily: "CustomFont",
        fontSize: `${size}px`
    } as CSSProperties;
}

export enum Font {
    Header,
    Title,
    Item,
    GameInfo,
    None
}

export const FONT_MAP = new Map([
    [Font.Header, getFontStyle(24)],    
    [Font.Title, getFontStyle(20)],
    [Font.Item, getFontStyle(16)],
    [Font.GameInfo, getFontStyle(24)],
    [Font.None, {}]
]);

export function getFontDescriptor(font: Font) {
    const fontAttributes = FONT_MAP.get(font);

    return `${fontAttributes.fontSize} ${fontAttributes.fontFamily}`;
}