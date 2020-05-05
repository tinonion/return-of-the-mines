import { DrawContext } from "./DrawContext";

const TILE_BORDER_THICKNESS = 2;

function initialDraw(tileCanvas: HTMLCanvasElement, drawContext: DrawContext) {
    const width = drawContext.totalWidth;
    const height = drawContext.totalHeight;
    const borderThickness = drawContext.borderThickness;
    const tileSize = drawContext.tileSize;

    // all drawing coords are relative to canvas
    // fill solid rectangle
    let ctx = tileCanvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, width, height);

    // draw borders
    ctx.lineWidth = borderThickness;
    const halfWidth = borderThickness / 2;

    // tile grid's border
    const paddedTiles = drawContext.tileExtents.createPadded(halfWidth);
    ctx.beginPath();
    ctx.rect(paddedTiles.left,
             paddedTiles.top,
             paddedTiles.width,
             paddedTiles.height);
    ctx.stroke();

    // draw tile grid
    const tilesX = drawContext.tileExtents.left;
    const tilesY = drawContext.tileExtents.top;
    ctx.lineWidth = TILE_BORDER_THICKNESS;
    for (let colX = tilesX; colX <= width; colX += tileSize) {
        ctx.moveTo(colX, tilesY);
        ctx.lineTo(colX, height);
        ctx.stroke();
    }

    for (let rowY = tilesY; rowY <= height; rowY += tileSize) {
        ctx.moveTo(0, rowY);
        ctx.lineTo(width, rowY);
        ctx.stroke();
    }

    ctx.restore();
}

function drawQuickMenu(canvas: HTMLCanvasElement, drawContext: DrawContext) {
    const tileExtents = drawContext.tileExtents;    

    let ctx = canvas.getContext("2d");
    ctx.save();

    ctx.fillStyle = 'black';
    ctx.globalAlpha = 0.7;
    ctx.fillRect(tileExtents.left, 
                 tileExtents.top, 
                 tileExtents.width, 
                 tileExtents.height);

    ctx.font = "24px Arial";
    ctx.fillStyle = "lightgrey";
    ctx.fillText("<c+n> Restart", tileExtents.left + 30, tileExtents.top + 100);

    ctx.restore();
}

export { initialDraw, drawQuickMenu, TILE_BORDER_THICKNESS };