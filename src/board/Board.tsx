import React, { useRef, useState, useCallback } from 'react';

import "./Board.css";
import { initialDraw, redrawTile } from './boardDrawing';
import Extents from '../util/Extents';
import { TileDrawProps } from './tile';


const TILE_SIZE = 23;
const BORDER_THICKNESS = 8;
const HEADER_HEIGHT = 90;

interface BoardProps {
    rowSize: number;
    colSize: number;
}

export interface DrawContext {
    tileSize: number;
    borderThickness: number;
    totalWidth: number;
    totalHeight: number;
    headerExtents: Extents;
    tileExtents: Extents;
}

function createDrawContext(boardProps: BoardProps): DrawContext {
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

function createTiles(rowSize: number, colSize: number) {
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

export function Board(props: BoardProps) {
    const drawingInfo = createDrawContext(props);

    const [tiles, setTiles] = useState(createTiles(props.rowSize, props.colSize));
    const [selectedTile, setSelectedTile] = useState(null);
    const canvasRef = useRef(null);

    const createBoard = useCallback(tileCanvas => {
        canvasRef.current = tileCanvas;
        resetBoard();
    }, []);

    function resetBoard() {
        setTiles(createTiles(props.rowSize, props.colSize));
        initialDraw(canvasRef.current, drawingInfo);
    }

    function refToCanvas(x: number, y: number) {
        // refs general client coords to canvas
        const canvasBounds = canvasRef.current.getBoundingClientRect();
        return [x - canvasBounds.x, y - canvasBounds.y];
    }

    function getTileInds(x: number, y: number) {
        // takes coords refed to canvas
        const tileX = x - drawingInfo.tileExtents.left;
        const tileY = y - drawingInfo.tileExtents.top;
        return [Math.floor(tileX / TILE_SIZE), Math.floor(tileY / TILE_SIZE)]
    }


    function getTileExtents(tileCol: number, tileRow: number) {
        const tileSize = drawingInfo.tileSize;
        return new Extents(
            drawingInfo.tileExtents.left + (tileCol * tileSize),
            drawingInfo.tileExtents.top + (tileRow * tileSize),
            tileSize, tileSize);
    }

    function changeTileValue(tileCol: number, tileRow: number, tileVal: number) {
        const tileExtents = getTileExtents(tileCol, tileRow);
        redrawTile(tileExtents, canvasRef.current, tileVal);
    }

    function handleMouseDown(e: React.MouseEvent) {
        const [canvasX, canvasY] = refToCanvas(e.clientX, e.clientY);

        if (drawingInfo.headerExtents.isInside(canvasX, canvasY)) {
            // handle clicking the header
            resetBoard();

        } else if (drawingInfo.tileExtents.isInside(canvasX, canvasY)) {
            // handle tile click
            const [tileCol, tileRow] = getTileInds(canvasX, canvasY);
    
            if (tiles[tileRow][tileCol] !== -1) {
                // tile is already revealed, do nothing
                return
            }
            
            changeTileValue(tileCol, tileRow, 0);

            // set current selected tile 
            setSelectedTile([tileCol, tileRow]);
        }
    }

    function handleMouseDrag(e: React.MouseEvent) {
        if (e.buttons !== 1) {
            // mouse is pressed
            return
        }

        const [canvasX, canvasY] = refToCanvas(e.clientX, e.clientY);        
        const [tileCol, tileRow] = getTileInds(canvasX, canvasY);
        const selectedTileExtents = getTileExtents(selectedTile[0], selectedTile[1]);

        if (!selectedTileExtents.isInside(canvasX, canvasY)) {
            // cursor moved selection to another tile
            changeTileValue(selectedTile[0], selectedTile[1], -1); // set tile to depressed
            changeTileValue(tileCol, tileRow, 0); // set tile to pressed

            setSelectedTile([tileCol, tileRow]);
        }
    }

    function handleMouseUp(e: React.MouseEvent) {

    }

    return (
        <canvas id="tileCanvas"
                className="board"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseDrag}
                onMouseUp={handleMouseUp}
                ref={createBoard}
                width={drawingInfo.totalWidth}
                height={drawingInfo.totalHeight} />
    );
}