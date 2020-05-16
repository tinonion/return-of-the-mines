import React, { useEffect, useRef, useCallback, CSSProperties } from 'react';

import createLocalizedKeyListener from "../../events/KeyboardSentinel";
import Board from "../../board/Board"
import { GameOptions } from '../../options/GameOptions';
import { TimerController } from './RTimer';
import { MineCounterController } from './RMineCounter';


const SPACEBAR = 32;
const C_KEY = 67;
const N_KEY = 78;

interface BoardProps {
    options: GameOptions,
    width: number,
    height: number,
    mineCounterController: MineCounterController,
    timerController: TimerController
}

export default function RBoard(props: BoardProps) {
    const boardRef = useRef(null);
    const canvasRef = useRef(null);

    // used for mounting component and initing keyboard event listener
    useEffect(() => { 
        boardRef.current = new Board(props.options, 
                                     canvasRef.current, 
                                     props.mineCounterController,
                                     props.timerController);

        // for unmounting board
        return () => {};
    });

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

        canvasRef.current = tileCanvas;
        createLocalizedKeyListener(handleKeyDown, handleKeyUp);

        tileCanvas.oncontextmenu = function (e: any) {
            // disable context menu on right click
            e.preventDefault();
        }
    }, [handleKeyDown, handleKeyUp]);


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

    return (
        <canvas onMouseDown={handleMouseDown}
                onMouseMove={handleMouseDrag}
                onMouseUp={handleMouseUp}
                ref={createBoard}
                width={props.width}
                height={props.height} />
    );
}