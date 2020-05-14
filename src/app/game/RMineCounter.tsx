import React, { useState, useEffect } from "react";

import ProgressInterface from "../../board/ProgressInterface";
import buildStyle, { Font, Color, Display } from "../css/StyleBuilder";

interface MineCounterProps {
    interface: ProgressInterface,
    initialCount: number
}

export default function RMineCounter(props: MineCounterProps) {
    const [mineCount, setMineCount] = useState(props.initialCount);

    useEffect(() => {
        setMineCount(props.initialCount);
    }, [props.initialCount]);

    function markMine() {
        setMineCount(mineCount - 1);
    }

    function unmarkMine() {
        setMineCount(mineCount + 1);
    }

    props.interface.markMine = markMine;
    props.interface.unmarkMine = unmarkMine;

    let style = buildStyle(Font.GameInfo, Color.Foreground, Display.InlineBlock);
    style.marginLeft = "10px";
    style.padding = "10px";

    return (
        <span style={style}>
            {mineCount}
        </span>
    );
}