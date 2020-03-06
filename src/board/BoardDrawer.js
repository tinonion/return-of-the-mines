const TILE_SIZE = 23;
const TILE_BORDER_THICKNESS = 2;
const BORDER_THICKNESS = 8;
const HEADER_HEIGHT = 90;

function getSizeRequirements(rowSize, colSize) {
    return [
        (rowSize * TILE_SIZE) + (BORDER_THICKNESS * 2),
        (colSize * TILE_SIZE) + (BORDER_THICKNESS * 3) + (HEADER_HEIGHT)
    ]
}

function initBoard(tileCanvas) {
    const canvasBounds = tileCanvas.getBoundingClientRect();
    const width = canvasBounds.width;
    const height = canvasBounds.height;

    // all drawing coords are relative to canvas
    let ctx = tileCanvas.getContext('2d');
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, width, height);

    // draw borders
    ctx.lineWidth = BORDER_THICKNESS;
    const halfWidth = BORDER_THICKNESS / 2;

    // header menu's border
    const headerHeight = HEADER_HEIGHT + (2 * BORDER_THICKNESS);
    ctx.beginPath();
    ctx.rect(halfWidth, halfWidth, width - BORDER_THICKNESS, headerHeight - BORDER_THICKNESS);
    ctx.stroke();

    // tile grid's border
    const tileGridY = headerHeight;
    ctx.beginPath();
    ctx.rect(halfWidth, tileGridY - halfWidth, 
             width - BORDER_THICKNESS, 
             height - tileGridY);
    ctx.stroke();

    // draw tile grid
    const tilesX = BORDER_THICKNESS;
    const tilesY = tileGridY;
    ctx.lineWidth = TILE_BORDER_THICKNESS;
    for (let colX = tilesX; colX <= width; colX += TILE_SIZE) {
        ctx.moveTo(colX, tileGridY);
        ctx.lineTo(colX, height);
        ctx.stroke();
    }

    for (let rowY = tilesY; rowY <= height; rowY += TILE_SIZE) {
        ctx.moveTo(0, rowY);
        ctx.lineTo(width, rowY);
        ctx.stroke();
    }
}

function clickBoard(tileCanvas, clickX, clickY) {
    const canvasBounds = tileCanvas.getBoundingClientRect();
    const canvasX = clickX - canvasBounds.x;
    const canvasY = clickY - canvasBounds.y;

    const canvasWidth = canvasBounds.width;
    const canvasHeight= canvasBounds.height;

    if (canvasX < BORDER_THICKNESS || canvasX > canvasWidth - BORDER_THICKNESS ||
        canvasY < BORDER_THICKNESS || canvasY > canvasHeight - BORDER_THICKNESS) 
    {
        // clicked borders, nothing happens
        return;
    }

    if (canvasY > BORDER_THICKNESS * 2 + HEADER_HEIGHT) {
        // clicked tile grid, process click
        pressTile(tileCanvas, clickX, clickY);

    } else {
        // clicked restart, reset board
        initBoard(tileCanvas);
    }
}

function pressTile(tileCanvas, clickX, clickY) {
    const canvasBounds = tileCanvas.getBoundingClientRect();
    const x = clickX - canvasBounds.x - BORDER_THICKNESS;
    const y = clickY - canvasBounds.y + BORDER_THICKNESS;

    const [tileCol, tileRow] = getTileInds(x, y);
    const tileLeft = tileCol * TILE_SIZE + BORDER_THICKNESS;
    const tileTop = tileRow * TILE_SIZE - BORDER_THICKNESS;

    let ctx = tileCanvas.getContext('2d');    
    ctx.fillStyle = 'light-grey';
    ctx.fillRect(tileLeft, tileTop, TILE_SIZE, TILE_SIZE);
}

function depressTile(tileCanvas, tileCol, tileRow) {
    const tileLeft = tileCol * TILE_SIZE + BORDER_THICKNESS;
    const tileTop = tileRow * TILE_SIZE - BORDER_THICKNESS;

    let ctx = tileCanvas.getContext('2d');    
    ctx.fillStyle = 'blue';
    ctx.fillRect(tileLeft, tileTop, TILE_SIZE, TILE_SIZE);
}

function getTileInds(x, y, board) {
    return [Math.floor(x / TILE_SIZE), Math.floor(y / TILE_SIZE)]
}

export { getSizeRequirements, initBoard, clickBoard }