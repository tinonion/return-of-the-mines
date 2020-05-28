import React from "react";
import buildStyle, { Font, Color, Display } from "../../css/StyleBuilder";

interface OptionButtonProps {
    text: string;
    selected: boolean;
    handleClick: VoidFunction;
}

export default function ROptionToggle(props: OptionButtonProps) {
    const selectedDescriptor = props.selected ? Color.Selected : Color.Unselected;

    let style = buildStyle(Font.Item, selectedDescriptor, Display.Block);
    style.padding = "4px";
    style.marginRight = "5px";
    style.cursor = "pointer";

    return (
        <div style={style}
            onClick={props.handleClick}>
            {props.text}
        </div>
    );
}