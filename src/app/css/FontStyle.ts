export enum Font {
    Header,
    Item,
    GameInfo
}

export const FONT_MAP = new Map([
   [Font.Header, {
       "font-family": "Helvetica",
       "font-size": "20px"
   }],
   [Font.Item, {
       "font-family": "Helvetica",
       "font-size": "16px"
   }],
   [Font.GameInfo, {
       "font-family": "Helvetica",
       "font-size": "24px"
   }]
]);