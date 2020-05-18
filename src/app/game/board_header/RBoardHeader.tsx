import buildStyle, { Display, Font, Color } from "../../css/StyleBuilder";
import React, { useState } from "react";
import { DEFAULT_BORDER_THICKNESS } from "../../../board/DrawContext";
import { BoardController } from "../../../board/Board";

interface BoardHeaderProps {
    width: number,
    scaleFactor: string,
    boardShift: number,
    mineCounter: JSX.Element,
    timer: JSX.Element,
    boardController: BoardController
}

export default function RBoardHeader(props: BoardHeaderProps) {
    const [mouseOver, setMouseOver] = useState(false);

    const scaleFactor = parseInt(props.scaleFactor) / 100;
    const borderWidth = DEFAULT_BORDER_THICKNESS * scaleFactor;
    const padding = 10 * scaleFactor;

    let style = buildStyle(Font.Header, Color.DeepBackground, Display.Flex);
    style.justifyContent = "space-between";
    style.border = "black";
    style.borderStyle = "solid";
    style.borderWidth = `${borderWidth}px ${borderWidth}px 0px ${borderWidth}px`;

    style.width = props.width - (borderWidth * 2) - (padding * 2);
    style.height = 48 * scaleFactor;
    style.marginTop = "10px";
    style.marginLeft = props.boardShift;
    style.padding = `${padding}px`;

    style.background = mouseOver ? "gray" : "lightgray";

    return (
        <div onMouseEnter={e => setMouseOver(true)}
             onMouseLeave={e => setMouseOver(false)}
             onClick={e => props.boardController.reset()}
            style={style}>
            {props.mineCounter}
            {props.timer}
        </div>
    );
}