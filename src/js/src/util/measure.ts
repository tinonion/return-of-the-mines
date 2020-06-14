import { Font, getFontDescriptor } from "../app/css/FontStyle";

const CANVAS = document.createElement("canvas");

export function getTextWidth(text: string, font: Font) {
    let context = CANVAS.getContext("2d");
    context.font = getFontDescriptor(font);
    let metrics = context.measureText(text);
    return metrics.width * 1.25; // custom font is always shrunk by this much for unknown reason
}

export function getTextHeight(text: string, font: Font) {
    let context = CANVAS.getContext("2d");
    context.font = getFontDescriptor(font);
    let metrics = context.measureText(text);
    return metrics.actualBoundingBoxDescent + metrics.actualBoundingBoxDescent + 2;
}