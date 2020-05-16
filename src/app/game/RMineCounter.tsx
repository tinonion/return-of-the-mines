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
    controller: MineCounterController,
    scaleFactor: string
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

    const scaleFactor = parseInt(props.scaleFactor) / 100;

    props.controller.reset = reset;
    props.controller.markMine = markMine;
    props.controller.unmarkMine = unmarkMine;

    let style = buildStyle(Font.GameInfo, Color.Foreground, Display.InlineBlock);
    style.padding = `${10 * scaleFactor}px`;
    style.fontSize = `${24 * scaleFactor}px`;
    style.width = `${28 * scaleFactor}px`;

    return (
        <span style={style}>
            {mineCount}
        </span>
    );
}