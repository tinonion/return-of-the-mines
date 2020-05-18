import React, { useState, CSSProperties } from "react";

import ROptionsBar from "./ROptionsBar";
import RBoard from "./RBoard";
import { defaultOptions, GameOptions } from "../../options/GameOptions";
import { inferCanvasSize } from "../../board/DrawContext";
import RBoardHeader from "./RBoardHeader";
import RMineCounter, { createMineCounterController } from "./RMineCounter";
import RTimer, { createTimerController } from "./RTimer";
import { createBoardController } from "../../board/Board";

export default function RGame() {
    const [options, setOptions] = useState(defaultOptions());

    function commitOptions(qualifier: keyof GameOptions, validated: any) {
        let newOptions = Object.assign({}, options);
        // @ts-ignore
        newOptions[qualifier] = validated;
        setOptions(newOptions);
    }

    const scaleFactor = options.displayOptions.scaleFactor;

    const mineCounterController = createMineCounterController();
    const mineCounter = options.displayOptions.showMineCount ?
                        <RMineCounter initialCount={options.difficultyOptions.mineCount}
                                      controller={mineCounterController}
                                      scaleFactor={scaleFactor}/>
                        : <span/>;


    const timerController = createTimerController();
    const timer = options.displayOptions.showTimer ?
                  <RTimer controller={timerController}
                          scaleFactor={scaleFactor}/> 
                    : <span/>;

    const [gameWidth, gameHeight] = inferCanvasSize(options.difficultyOptions.colCount, 
                                                    options.difficultyOptions.rowCount, 
                                                    options.displayOptions.scaleFactor);

    const boardController = createBoardController();
    const board = <RBoard options={options}
                    width={gameWidth}
                    height={gameHeight}
                    mineCounterController={mineCounterController}
                    timerController={timerController}
                    boardController={boardController}/>


    return (
        <div style={{marginLeft: "10px"} as CSSProperties}>
            <ROptionsBar commitOptions={commitOptions}/>
            <RBoardHeader width={gameWidth}
                          scaleFactor={scaleFactor}
                          mineCounter={mineCounter}
                          timer={timer}
                          boardController={boardController}/>
            {board}
        </div>
    );
}