import React from "react";
import buildStyle, { Font, Color, Display } from "../../css/StyleBuilder";

interface OptionButtonProps {
    inline: boolean,
    text: string;
    selected: boolean;
    handleClick: VoidFunction;
}

export default function ROptionToggle(props: OptionButtonProps) {
    const selectedDescriptor = props.selected ? Color.Selected : Color.Unselected;

    let style = buildStyle(Font.Item, selectedDescriptor, Display.InlineBlock);
    style.display = props.inline ? "inline-block" : "block";
    style.padding = "4px";
    style.cursor = "pointer";

    return (
        <div style={style}
            onClick={props.handleClick}>
            {props.text}
        </div>
    );
}