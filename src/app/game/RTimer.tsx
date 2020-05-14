import { useState } from "react";
import React from "react";

import ProgressInterface from "../../board/ProgressInterface";
import buildStyle, { Font, Color, Display } from "../css/StyleBuilder";

interface TimerProps {
    interface: ProgressInterface
}

export default function RTimer(props: TimerProps) {
    const [time, setTime] = useState(0);
    const [currentInterval, setCurrentInterval] = useState(null);

    function timer() {
        setTime(time => time + 1);
    }

    function start() {
        const interval = setInterval(timer, 1000);
        setCurrentInterval(interval);
    }

    function stop() {
        clearInterval(currentInterval);
    }

    function reset() {
        stop();
        setTime(0);
    }

    let progressInterface = props.interface;
    progressInterface.startGame = start;
    progressInterface.endGame = stop;
    progressInterface.resetGame = reset;

    let style = buildStyle(Font.GameInfo, Color.Foreground, Display.InlineBlock);
    style.marginLeft = "10px";
    style.padding = "10px";

    return (
        <div style={style}>
            {time}
        </div>
    );
}