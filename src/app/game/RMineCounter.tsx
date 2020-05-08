import React, { useState, useEffect } from "react";

import "../css/MineCounter.css";
import ProgressInterface from "../../board/ProgressInterface";

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

    return (
        <span className="mine-counter">
            {mineCount}
        </span>
    );
}