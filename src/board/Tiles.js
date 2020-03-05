import React, { useState, useCallback } from 'react';

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

function pressTile(tileCanvas, board, tileCol, tileRow) {
    let ctx = tileCanvas.getContext('2d');    
    const tileLeft = tileCol * TILE_SIZE_PX;
    const tileTop = tileRow * TILE_SIZE_PX;

    ctx.fillStyle = 'light-grey';
    ctx.fillRect(tileLeft, tileTop, TILE_SIZE_PX, TILE_SIZE_PX);
}

function getTileInds(x, y) {
    console.log("x, y", x, y)
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
    const [htmlCanvas, setHtmlCanvas] = useState(null);

    const createBoard = useCallback(tileCanvas => {
        setHtmlCanvas(tileCanvas);
        initTiles(tileCanvas, board);
    }, [board]);

    function handleClick(e) {
        // coords relative to top left of canvas
        const x = e.clientX - board.x;
        const y = e.clientY - board.y;

        const tileInds = getTileInds(x, y);

        console.log("inds", tileInds);

        pressTile(htmlCanvas, board, tileInds[0], tileInds[1]);
    }

    return (
        <canvas id="tileCanvas"
                onClick={handleClick}
                ref={createBoard}
                width={board.row_size * TILE_SIZE_PX}
                height={board.col_size * TILE_SIZE_PX} />
    );
}

export default Tiles;