import React, { useEffect, useRef, useCallback } from 'react';

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

export default function RBoard(props: BoardProps) {
    const boardRef = useRef(null);
    const canvasRef = useRef(null);

    // used for mounting component and initing keyboard event listener
    useEffect(() => { 
        const diffOptions = props.options.difficultyOptions;
        const colCount = diffOptions.colCount; 
        const rowCount = diffOptions.rowCount;
        const mineCount = diffOptions.mineCount;

        boardRef.current = new Board(colCount, rowCount, mineCount, canvasRef.current);

        // for unmounting board
        return () => {};
    });

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
        const board = boardRef.current;
        const [canvasX, canvasY] = refToCanvas(e.clientX, e.clientY);
        if (e.buttons === 1) {
            board.handleLeftClick(canvasX, canvasY);

        } else if (e.buttons === 2) {
            board.handleRightClick(canvasX, canvasY);
        }
    }

    function handleMouseDrag(e: React.MouseEvent) {
        const board = boardRef.current;
        if (e.buttons === 1) {
            // mouse is pressed
            const [canvasX, canvasY] = refToCanvas(e.clientX, e.clientY);        
            board.handleMouseDrag(canvasX, canvasY);
        }
    }

    function handleMouseUp(e: React.MouseEvent) {
        const board = boardRef.current;
        if (e.button === 0) {
            // reveal currently selected tile
            const [canvasX, canvasY] = refToCanvas(e.clientX, e.clientY);        
            board.handleMouseUp(canvasX, canvasY);
        }
    }

    const handleKeyDown = useCallback((e: KeyboardEvent, clientX: number, clientY: number) => {
        const board = boardRef.current;
        const [x, y] = refToCanvas(clientX, clientY);
        if (!isPointInCanvas(x, y)) { return; }

        if (e.keyCode === SPACEBAR) {
            board.handleSpaceDown(x, y);

        } else if (e.keyCode === C_KEY) {
            board.showQuickMenu();

        } else if (e.keyCode === N_KEY) {
            board.handleNKeyDown();
        }
    }, [boardRef]);

    const handleKeyUp = useCallback((e: KeyboardEvent, clientX: number, clientY: number) => {
        const board = boardRef.current;
        if (e.keyCode === C_KEY) {
            board.hideQuickMenu();
        }
    }, [boardRef]);

    const createBoard = useCallback((tileCanvas: HTMLCanvasElement) => {
        if (tileCanvas == null) { return; }

        console.log("create board");

        canvasRef.current = tileCanvas;
        createLocalizedKeyListener(handleKeyDown, handleKeyUp);

        tileCanvas.oncontextmenu = function (e: any) {
            // disable context menu on right click
            e.preventDefault();
        }
    }, [handleKeyDown, handleKeyUp]);

    const colCount = props.options.difficultyOptions.colCount; 
    const rowCount = props.options.difficultyOptions.rowCount;
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