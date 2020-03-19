import React, { useRef, useState, useCallback } from 'react';

import "./Board.css";
import { inferCanvasSize } from "../board/DrawContext";
import Board from "../board/Board"

interface BoardProps {
    rowSize: number;
    colSize: number;
}

export function RBoard(props: BoardProps) {
    let board: Board;

    const canvasRef = useRef(null);

    const createBoard = useCallback(tileCanvas => {
        tileCanvas.oncontextmenu = function (e: any) {
            // disable context menu on right click
            e.preventDefault();
        }

        canvasRef.current = tileCanvas;
        board = new Board(props.rowSize, props.colSize, canvasRef.current);
    }, []);

    function refToCanvas(x: number, y: number) {
        // refs general client coords to canvas
        const canvasBounds = canvasRef.current.getBoundingClientRect();
        return [x - canvasBounds.x, y - canvasBounds.y];
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

    const [width, height] = inferCanvasSize(props.rowSize, props.colSize);
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