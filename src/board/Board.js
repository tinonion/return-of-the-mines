import React, { useState, useCallback } from 'react';

import "./Board.css"
import { getSizeRequirements, initBoard, clickBoard } from './BoardDrawer';

function Board(props) {
    let initialBoardState = {
        x: 0,
        y: 0,
        rowSize: props.rowSize,
        colSize: props.colSize,
        tileSize: 23
    };

    const [board, setBoard] = useState(initialBoardState);
    const [htmlCanvas, setHtmlCanvas] = useState(null);

    const createBoard = useCallback(tileCanvas => {
        setHtmlCanvas(tileCanvas);
        initBoard(tileCanvas);
    }, []);

    function handleTileDepression(e) {
        depressTile(htmlCanvas, e.clientX, e.clientY);
    }

    function revealTile(e) {
        revealTile(htmlCanvas, e.clientX, e.clientY);
    }

    const [boardWidth, boardHeight] = getSizeRequirements(board.rowSize, board.colSize);

    return (
        <canvas id="tileCanvas"
                className="board"
                onMouseDown={handleTileDepression}
                onDrag={handleTileDepression}
                onMouseUp={revealTile}
                ref={createBoard}
                width={boardWidth}
                height={boardHeight} />
    );
}

export default Board;