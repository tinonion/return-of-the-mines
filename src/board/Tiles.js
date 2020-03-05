import React, { useRef, useCallback, useState } from 'react';

const TILE_SIZE_PX = 23;

function initTiles(tileCanvas, board) {
    const canvasBounds = tileCanvas.getBoundingClientRect();
    const width = board.row_size * TILE_SIZE_PX;
    const height = board.col_size * TILE_SIZE_PX;

    board.x = canvasBounds.x;
    board.y = canvasBounds.y;

    // all drawing coords are relative to canvas
    let ctx = tileCanvas.getContext('2d');
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;

    for (let rowX = 0; rowX <= width; rowX += TILE_SIZE_PX) {
        ctx.moveTo(rowX, 0);
        ctx.lineTo(rowX, height);
        ctx.stroke();
    }

    for (let rowY = 0; rowY <= height; rowY += TILE_SIZE_PX) {
        ctx.moveTo(0, rowY);
        ctx.lineTo(width, rowY);
        ctx.stroke();
    }
}

function getTileInds(x, y) {
    return [Math.floor(x / TILE_SIZE_PX), Math.floor(y / TILE_SIZE_PX)]
}

function Tiles(props) {
    let initialBoardState = {
        x: 0,
        y: 0,
        row_size: props.row_size,
        col_size: props.col_size
    };
    const [board, setBoard] = useState(initialBoardState);

    function handleClick(e) {
        // coords relative to top left of canvas
        const x = e.clientX - board.x;
        const y = e.clientY - board.y;

        console.log(x, y);
    }

    const createBoard = useCallback(tileCanvas => initTiles(tileCanvas, board), [])
    return (
        <canvas id="tileCanvas"
                onClick={handleClick}
                ref={createBoard}
                width={board.row_size * TILE_SIZE_PX}
                height={board.col_size * TILE_SIZE_PX} />
    );
}

export default Tiles;