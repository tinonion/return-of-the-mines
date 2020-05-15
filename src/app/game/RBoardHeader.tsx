import buildStyle, { Display, Font, Color } from "../css/StyleBuilder";
import React from "react";

interface BoardHeaderProps {
    width: number,
    mineCounter: JSX.Element,
    timer: JSX.Element
}

export default function RBoardHeader(props: BoardHeaderProps) {
    let style = buildStyle(Font.Header, Color.DeepBackground, Display.Block);

    return (
        <div style={style}>
            {props.mineCounter}
            {props.timer}
        </div>
    );
}