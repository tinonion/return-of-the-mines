import React from "react";
import buildStyle, { Font, Display, Color } from "../../css/StyleBuilder";
import { getTextWidth } from "../../../util/measure";

export interface SliderProps {
    onMouseUp: (v: string) => void
}

// mark text on left, 
// position of mark on right in scale of 0 to 1 ratio of slider length
export type Mark = [string, number];

const DEFAULT_FONT = Font.Item;

const DEFAULT_MARK_STYLE = buildStyle(DEFAULT_FONT, Color.Tertiary, Display.InlineBlock);
DEFAULT_MARK_STYLE.position = "relative";
DEFAULT_MARK_STYLE.top = "2px";

// creates collection of span elements that are styled marks
export function createMarks(sliderPxLength: number, marks: Array<Mark>): Array<JSX.Element> {
    let markElements = new Array<JSX.Element>();

    let horizontalPos = 0;

    for (let i = 0; i < marks.length; i++) {
        const [markText, markPos] = marks[i];
        const markOffset = markPos * sliderPxLength;

        let markStyle = Object.assign({}, DEFAULT_MARK_STYLE);
        const textWidth = getTextWidth(markText, DEFAULT_FONT);

        // total offset must account for width of previous marks and
        // dilation factor for keeping all marks inside bounding box of slider
        markStyle.left = `${markOffset - horizontalPos - (textWidth * markPos)}px`;
        const markElement = <span key={i}
                                  style={markStyle}>{markText}</span>;
        markElements.push(markElement);

        // account for width padding of previous marks
        horizontalPos += textWidth;
    }

    return markElements;
}

export function createSliderTitle(title: string) {
    const style = buildStyle(Font.Item, Color.Tertiary, Display.Block);

    return (
        <div style={style}>
           {title} 
        </div>
    );
}

export function createSliderStyle(width: number) {
    const sliderStyle = buildStyle(Font.Item, Color.Tertiary, Display.InlineBlock);
    sliderStyle.width = width;
    sliderStyle.padding = "5px 10px 5px 10px";

    return sliderStyle;
}