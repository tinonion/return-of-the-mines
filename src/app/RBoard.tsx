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
        board.handleMouseDown(canvasX, canvasY);
    }

    function handleMouseDrag(e: React.MouseEvent) {
        if (e.buttons !== 1) {
            // mouse is not pressed
            return
        }

        const [canvasX, canvasY] = refToCanvas(e.clientX, e.clientY);        
        board.handleMouseDrag(canvasX, canvasY);
    }

    function handleMouseUp(e: React.MouseEvent) {
        // reveal currently selected tile
        const [canvasX, canvasY] = refToCanvas(e.clientX, e.clientY);        
        board.handleMouseUp(canvasX, canvasY);
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