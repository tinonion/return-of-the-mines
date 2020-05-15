import { useState } from "react";
import React from "react";

import buildStyle, { Font, Color, Display } from "../css/StyleBuilder";

export interface TimerController {
    start: () => void,
    stop: () => void,
    reset: () => void
}

export function createTimerController() {
    return {
        start: () => {},
        stop: () => {},
        reset: () => {},
    } as TimerController;
}

interface TimerProps {
    controller: TimerController
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

    let controller = props.controller;
    controller.start = start;
    controller.stop = stop;
    controller.reset = reset;

    let style = buildStyle(Font.GameInfo, Color.Foreground, Display.InlineBlock);
    style.marginLeft = "10px";
    style.padding = "10px";

    return (
        <div style={style}>
            {time}
        </div>
    );
}