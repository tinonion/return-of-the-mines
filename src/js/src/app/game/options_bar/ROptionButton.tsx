import React, { MouseEvent } from "react";

import buildStyle, { Display, Font, Color } from "../../css/StyleBuilder";

interface OptionButtonProps {
    onClick: (e: MouseEvent) => void,
    text: string
}

export default function ROptionButton(props: OptionButtonProps) {
    let style = buildStyle(Font.Item, Color.Tertiary, Display.Inline);
    style.border = "none";

    return (
        <button style={style}
                onClick={props.onClick}>
            {props.text}
        </button>
    );
}