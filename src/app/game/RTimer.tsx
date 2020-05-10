import { useState } from "react";
import React from "react";

import ProgressInterface from "../../board/ProgressInterface";
import "../css/Timer.css";

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

    return (
        <div className="timer">
            {time}
        </div>
    );
}