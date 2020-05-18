export enum Font {
    Header,
    Item,
    GameInfo
}

export const FONT_MAP = new Map([
   [Font.Header, {
       fontFamily: "Helvetica",
       fontSize: "20px"
   }],
   [Font.Item, {
       fontFamily: "Helvetica",
       fontSize: "16px"
   }],
   [Font.GameInfo, {
       fontFamily: "Helvetica",
       fontSize: "24px"
   }]
]);

export function getFontDescriptor(font: Font) {
    const fontAttributes = FONT_MAP.get(font);

    return `${fontAttributes.fontSize} ${fontAttributes.fontFamily}`;
}