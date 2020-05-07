import React, { useState, useEffect } from "react";

import "../css/MineCounter.css";

interface MineCounterProps {
    initialCount: number
}

export default function RMineCounter(props: MineCounterProps) {
    const [mineCount, setMineCount] = useState(props.initialCount);

    useEffect(() => {
        setMineCount(props.initialCount);
    });

    return (
        <span className="mine-counter">
            {mineCount}
        </span>
    );
}