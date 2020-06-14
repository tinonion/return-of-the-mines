import { CSSProperties } from "react";

import { Font, FONT_MAP } from "./FontStyle";
import { Color, COLOR_MAP } from "./ColorStyle";
import { Display, DISPLAY_MAP } from "./DisplayStyle";

export { Font, Color as Color, Display }

export default function buildStyle(font: Font, color: Color, display: Display): CSSProperties {
    let style = {} as CSSProperties;

    Object.assign(style, FONT_MAP.get(font));
    Object.assign(style, COLOR_MAP.get(color));
    style.display = DISPLAY_MAP.get(display);

    return style;
}