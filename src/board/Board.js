import React, { useRef, useState, useCallback } from 'react';

import "./Board.css";
import { initialDraw, redrawTile } from './BoardDrawer';
import Extents from '../util/Extents';

const TILE_SIZE = 23;
const BORDER_THICKNESS = 8;
const HEADER_HEIGHT = 90;

function createDrawingInfo(boardProps) {
    const width = (boardProps.rowSize * TILE_SIZE) + (BORDER_THICKNESS * 2)
    const height = (boardProps.colSize * TILE_SIZE) + (BORDER_THICKNESS * 3) + (HEADER_HEIGHT)
    return {
        tileSize: TILE_SIZE,
        borderThickness: BORDER_THICKNESS,
        totalWidth: width,
        totalHeight: height,
        headerExtents: new Extents(BORDER_THICKNESS,
                                   BORDER_THICKNESS,
                                   width - (2 * BORDER_THICKNESS),
                                   HEADER_HEIGHT),
        tileExtents: new Extents(BORDER_THICKNESS,
                                 HEADER_HEIGHT + (BORDER_THICKNESS * 2),
                                 boardProps.rowSize * TILE_SIZE,
                                 boardProps.colSize * TILE_SIZE)
    }
}

function createTiles(rowSize, colSize) {
    let tiles = []

    for (let row = 0; row < rowSize; row++) {
        let newRow = [];

        for (let col = 0; col < colSize; col++) {
            newRow.push(-1);
        }
        tiles.push(newRow);
    }

    return tiles;
}

function getTileInds(x, y) {
    return [Math.floor(x / TILE_SIZE), Math.floor(y / TILE_SIZE)]
}

function Board(props) {
    const drawingInfo = createDrawingInfo(props);
    const [tiles, setTiles] = useState(createTiles(props.rowSize, props.colSize));
    const canvasRef = useRef(null);

    const createBoard = useCallback(tileCanvas => {
        canvasRef.current = tileCanvas;
        resetBoard();
    }, []);

    function resetBoard() {
        setTiles(createTiles(props.rowSize, props.colSize));
        initialDraw(canvasRef.current, drawingInfo);
    }

    function pressTile(tileCol, tileRow) {
        tiles[tileRow][tileCol] = 0;
        redrawTile(tileCol, tileRow, drawingInfo, canvasRef.current, 0);
    }

    function handleMouseDown(e) {
        const canvasBounds = canvasRef.current.getBoundingClientRect();
        const canvasX = e.clientX - canvasBounds.x;
        const canvasY = e.clientY - canvasBounds.y;

        if (drawingInfo.headerExtents.isInside(canvasX, canvasY)) {
            // handle clicking the header
            resetBoard();

        } else if (drawingInfo.tileExtents.isInside(canvasX, canvasY)) {
            // handle tile click
            const tileX = canvasX - drawingInfo.tileExtents.left;
            const tileY = canvasY - drawingInfo.tileExtents.top;
            const [tileCol, tileRow] = getTileInds(tileX, tileY);
    
            if (tiles[tileRow][tileCol] != -1) {
                // tile is already revealed, do nothing
                return
            }

            pressTile(tileCol, tileRow);
        }
    }

    function handleMouseDrag(e) {
//        revealTile(htmlCanvas, e.clientX, e.clientY);
    }

    function handleMouseUp(e) {

    }

    return (
        <canvas id="tileCanvas"
                className="board"
                onMouseDown={handleMouseDown}
                onDrag={handleMouseDrag}
                onMouseUp={handleMouseUp}
                ref={createBoard}
                width={drawingInfo.totalWidth}
                height={drawingInfo.totalHeight} />
    );
}

export default Board;