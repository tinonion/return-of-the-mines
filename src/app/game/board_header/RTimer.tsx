import { useState } from "react";
import React from "react";

import buildStyle, { Font, Color, Display } from "../../css/StyleBuilder";

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
    controller: TimerController,
    scaleFactor: string
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

    const scaleFactor = parseInt(props.scaleFactor) / 100;

    let style = buildStyle(Font.GameInfo, Color.Tertiary, Display.InlineBlock);
    style.padding = `${10 * scaleFactor}px`;
    style.width = `${30 * scaleFactor}px`;
    style.fontSize = `${24 * scaleFactor}px`;

    return (
        <div style={style}>
            <div style={{display: "flex", float: "right"}}>
                {time}
            </div>
        </div>
    );
}