import React from "react";
import RMineCounter from "./RMineCounter";
import ProgressInterface, { defaultProgressInterface } from "../../board/ProgressInterface";
import RTimer from "./RTimer";

interface ProgressMenuProps {
    collectProgressInterface: (i: ProgressInterface) => void,
    initialCount: number,
    hasMineCounter: boolean,
    hasTimer: boolean
}

export default function RProgressMenu(props: ProgressMenuProps) {
    let progressInterface = defaultProgressInterface();

    const mineCounter = props.hasMineCounter ? <RMineCounter initialCount={props.initialCount}
                                                             interface={progressInterface}/> : <div/>
    const timer = props.hasTimer ? <RTimer interface={progressInterface}/> : <div/>;

    props.collectProgressInterface(progressInterface);

    return (
        <div>
            {mineCounter}
            {timer}
        </div>
    );
}