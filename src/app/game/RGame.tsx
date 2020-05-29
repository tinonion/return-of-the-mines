import React, { useState, CSSProperties } from "react";

import ROptionsBar from "./options_bar/ROptionsBar";
import RBoard from "./RBoard";
import { defaultOptions, GameOptions } from "../../options/GameOptions";
import { inferCanvasSize } from "../../board/DrawContext";
import RBoardHeader from "./board_header/RBoardHeader";
import RMineCounter, { createMineCounterController } from "./board_header/RMineCounter";
import RTimer, { createTimerController } from "./board_header/RTimer";
import { createBoardController } from "../../board/Board";

const GAME_WIDTH = 900;

export default function RGame() {
    const [options, setOptions] = useState(defaultOptions());

    function commitOptions(qualifier: keyof GameOptions, validated: any) {
        let newOptions = Object.assign({}, options);
        // @ts-ignore
        newOptions[qualifier] = validated;
        setOptions(newOptions);
    }

    const scaleFactor = options.displayOptions.scaleFactor;
    const [boardWidth, boardHeight] = inferCanvasSize(options.difficultyOptions.colCount, 
                                                    options.difficultyOptions.rowCount, 
                                                    options.displayOptions.scaleFactor);

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

    const boardController = createBoardController();
    const board = <RBoard options={options}
                    width={boardWidth}
                    height={boardHeight}
                    mineCounterController={mineCounterController}
                    timerController={timerController}
                    boardController={boardController}/>

    const gameStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    } as CSSProperties;

    return (
        <div style={gameStyle}>
            <ROptionsBar commitOptions={commitOptions}/>
            <RBoardHeader scaleFactor={scaleFactor}
                          width={boardWidth}
                          mineCounter={mineCounter}
                          timer={timer}
                          boardController={boardController}/>
            {board}
        </div>
    );
}