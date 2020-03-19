import Extents from "../util/Extents"
import { TileDrawMap } from "./tile/tileDrawing";
import { DrawContext } from "./DrawContext";

const TILE_BORDER_THICKNESS = 2;

function initialDraw(tileCanvas: HTMLCanvasElement, drawingInfo: DrawContext) {
    const width = drawingInfo.totalWidth;
    const height = drawingInfo.totalHeight;
    const borderThickness = drawingInfo.borderThickness;
    const tileSize = drawingInfo.tileSize;

    // all drawing coords are relative to canvas
    // fill solid rectangle
    let ctx = tileCanvas.getContext('2d');
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, width, height);

    // draw borders
    ctx.lineWidth = borderThickness;
    const halfWidth = borderThickness / 2;

    // header menu's border
    const paddedHeader = drawingInfo.headerExtents.createPadded(halfWidth);
    ctx.beginPath();
    ctx.rect(paddedHeader.left,
             paddedHeader.top,
             paddedHeader.width,
             paddedHeader.height);
    ctx.stroke();

    // tile grid's border
    const paddedTiles = drawingInfo.tileExtents.createPadded(halfWidth);
    ctx.beginPath();
    ctx.rect(paddedTiles.left,
             paddedTiles.top,
             paddedTiles.width,
             paddedTiles.height);
    ctx.stroke();

    // draw tile grid
    const tilesX = drawingInfo.tileExtents.left;
    const tilesY = drawingInfo.tileExtents.top;
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
}

function redrawTile(
    tileExtents: Extents, tileCanvas: HTMLCanvasElement, tileVal: number, drawContext: DrawContext) {
    const tileDrawProps = TileDrawMap(tileVal);
    
    let ctx = tileCanvas.getContext('2d');

    const color = tileDrawProps.baseColor;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.fillRect(tileExtents.left, tileExtents.top, 
        tileExtents.width, tileExtents.height);
    ctx.stroke();

    ctx.lineWidth = TILE_BORDER_THICKNESS;
    ctx.beginPath();
    ctx.rect(tileExtents.left, tileExtents.top, 
        tileExtents.width, tileExtents.height);
    ctx.stroke();

    if (tileDrawProps.imagePath != null) {
        // copy image into new one and assign load callback
        let img = new Image();
        img.src = tileDrawProps.imagePath

        const tileSize = drawContext.tileSize;
        img.onload = function () {
            ctx.drawImage(img,
            tileExtents.left, tileExtents.top,
            tileSize, tileSize);
        }
    }
}

export { initialDraw, redrawTile }