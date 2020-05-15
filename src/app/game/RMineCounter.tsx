import React, { useState, useEffect } from "react";

import buildStyle, { Font, Color, Display } from "../css/StyleBuilder";

export interface MineCounterController {
    reset: () => void,
    markMine: () => void,
    unmarkMine: () => void
}

export function createMineCounterController() {
    return {
        reset: () => {},
        markMine: () => {},
        unmarkMine: () => {}
    } as MineCounterController;
}

interface MineCounterProps {
    initialCount: number,
    controller: MineCounterController
}

export default function RMineCounter(props: MineCounterProps) {
    const [mineCount, setMineCount] = useState(props.initialCount);

    useEffect(() => {
        setMineCount(props.initialCount);
    }, [props.initialCount]);

    function reset() {
        setMineCount(props.initialCount);
    }

    function markMine() {
        setMineCount(mineCount - 1);
    }

    function unmarkMine() {
        setMineCount(mineCount + 1);
    }

    props.controller.reset = reset;
    props.controller.markMine = markMine;
    props.controller.unmarkMine = unmarkMine;

    let style = buildStyle(Font.GameInfo, Color.Foreground, Display.InlineBlock);
    style.marginLeft = "10px";
    style.padding = "10px";

    return (
        <span style={style}>
            {mineCount}
        </span>
    );
}