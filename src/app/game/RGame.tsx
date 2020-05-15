import React, { useState, useRef } from "react";

import ROptionsBar from "./ROptionsBar";
import RBoard from "./RBoard";
import { defaultOptions, GameOptions } from "../../options/GameOptions";
import { inferCanvasSize } from "../../board/DrawContext";
import RBoardHeader from "./RBoardHeader";
import RMineCounter, { createMineCounterController } from "./RMineCounter";
import RTimer, { createTimerController } from "./RTimer";

export default function RGame() {
    const [options, setOptions] = useState(defaultOptions());
    const progressInterface = useRef(null);

    function commitOptions(qualifier: keyof GameOptions, validated: any) {
        let newOptions = Object.assign({}, options);
        // @ts-ignore
        newOptions[qualifier] = validated;
        setOptions(newOptions);
    }

    const mineCounterController = createMineCounterController();
    const mineCounter = <RMineCounter initialCount={options.difficultyOptions.mineCount}
                                      controller={mineCounterController}/>

    const timerController = createTimerController();
    const timer = <RTimer controller={timerController}/> 

    const [gameWidth, gameHeight] = inferCanvasSize(options.difficultyOptions.colCount, 
                                                    options.difficultyOptions.rowCount, 
                                                    options.displayOptions.scaleFactor);

    return (
        <div>
            <ROptionsBar commitOptions={commitOptions}/>
            <RBoardHeader width={gameWidth}
                          mineCounter={mineCounter}
                          timer={timer}/>
            <br/>
            <RBoard options={options}
                    width={gameWidth}
                    height={gameHeight}
                    mineCounterController={mineCounterController}
                    timerController={timerController}/>
        </div>
    );
}