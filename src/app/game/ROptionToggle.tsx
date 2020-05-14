import React from "react";
import buildStyle, { Font, Color, Display } from "../css/StyleBuilder";

interface OptionButtonProps {
    text: string;
    selected: boolean;
    handleClick: VoidFunction;
}

export default function ROptionToggle(props: OptionButtonProps) {
    const selectedDescriptor = props.selected ? Color.Selected : Color.Unselected;

    let style = buildStyle(Font.Item, selectedDescriptor, Display.InlineBlock);
    style.marginTop = "8px";
    style.padding = "3px";
    style.cursor = "pointer";

    return (
        <div style={style}
            onClick={props.handleClick}>
            {props.text}
        </div>
    );
}