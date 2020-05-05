import React, { useEffect, useRef, useCallback, useState } from 'react';

import "../css/Board.css";
import { inferCanvasSize } from "../../board/DrawContext";
import createLocalizedKeyListener from "../../events/KeyboardSentinel";
import Board from "../../board/Board"
import { GameOptions } from '../../options/GameOptions';

const SPACEBAR = 32;
const C_KEY = 67;
const N_KEY = 78;

interface BoardProps {
    options: GameOptions
}

export function boardPropsAreEqual(props1: BoardProps, props2: BoardProps) {
    console.log("props compare", props1.options === props2.options);
    return props1.options === props2.options;
}

export default function RBoard(props: BoardProps) {
    let board: Board;
    const diffOptions = props.options.difficultyOptions;
    const colCount = diffOptions.colCount;
    const rowCount = diffOptions.rowCount;
    const mineCount = diffOptions.mineCount;

    const canvasRef = useRef(null);

    // used for mounting component and initing keyboard event listener
    useEffect(() => { 
        console.log("mounting board");
        board = new Board(colCount, rowCount, mineCount, canvasRef.current);

        // for unmounting board
        return () => {};
    });

    const createBoard = useCallback(tileCanvas => {
        if (tileCanvas == null) { return; }

        canvasRef.current = tileCanvas;
        createLocalizedKeyListener(handleKeyDown, handleKeyUp);

        tileCanvas.oncontextmenu = function (e: any) {
            // disable context menu on right click
            e.preventDefault();
        }
    }, []);

    function refToCanvas(x: number, y: number) {
        // refs general client coords to canvas
        const canvasBounds = canvasRef.current.getBoundingClientRect();
        return [x - canvasBounds.x, y - canvasBounds.y];
    }

    function isPointInCanvas(x: number, y: number) {
        // takes a point already refed to canvas
        const bounds = canvasRef.current.getBoundingClientRect();
        return (x >= 0 && y >= 0 && x < bounds.width && y < bounds.height);
    }

    function handleMouseDown(e: React.MouseEvent) {
        const [canvasX, canvasY] = refToCanvas(e.clientX, e.clientY);
        if (e.buttons === 1) {
            board.handleLeftClick(canvasX, canvasY);

        } else if (e.buttons === 2) {
            board.handleRightClick(canvasX, canvasY);
        }
    }

    function handleMouseDrag(e: React.MouseEvent) {
        if (e.buttons === 1) {
            // mouse is pressed
            const [canvasX, canvasY] = refToCanvas(e.clientX, e.clientY);        
            board.handleMouseDrag(canvasX, canvasY);
        }
    }

    function handleMouseUp(e: React.MouseEvent) {
        if (e.button === 0) {
            // reveal currently selected tile
            const [canvasX, canvasY] = refToCanvas(e.clientX, e.clientY);        
            board.handleMouseUp(canvasX, canvasY);
        }
    }

    function handleKeyDown(e: KeyboardEvent, clientX: number, clientY: number) {
        const [x, y] = refToCanvas(clientX, clientY);
        if (!isPointInCanvas(x, y)) { return; }

        if (e.keyCode === SPACEBAR) {
            board.handleSpaceDown(x, y);

        } else if (e.keyCode === C_KEY) {
            board.showQuickMenu();

        } else if (e.keyCode === N_KEY) {
            board.handleNKeyDown();
        }
    }

    function handleKeyUp(e: KeyboardEvent, clientX: number, clientY: number) {
        if (e.keyCode === C_KEY) {
            board.hideQuickMenu();
        }
    }

    const [width, height] = inferCanvasSize(colCount, rowCount);
    return (
        <canvas id="tileCanvas"
                className="board"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseDrag}
                onMouseUp={handleMouseUp}
                ref={createBoard}
                width={width}
                height={height} />
    );
}