import Extents from "../util/Extents";

const DEFAULT_TILE_SIZE = 23;
export const DEFAULT_BORDER_THICKNESS = 8;

export interface DrawContext {
    tileSize: number;
    borderThickness: number;
    totalWidth: number;
    totalHeight: number;
    tileExtents: Extents;
}

function getScaled(target: number, scaleFactor: string) {
    return (parseInt(scaleFactor) / 100) * target;
}

export function createDrawContext(colCount: number, rowCount: number, scaleFactor: string): DrawContext {
    const tileSize = getScaled(DEFAULT_TILE_SIZE, scaleFactor);
    const borderThickness = getScaled(DEFAULT_BORDER_THICKNESS, scaleFactor);

    const height = (rowCount * tileSize) + (borderThickness * 2);
    const width = (colCount * tileSize) + (borderThickness * 2);
    return {
        tileSize: tileSize,
        borderThickness: borderThickness,
        totalWidth: width,
        totalHeight: height,
        tileExtents: new Extents(borderThickness,
                                 borderThickness,
                                 colCount * tileSize,
                                 rowCount * tileSize)
    }
}

export function inferCanvasSize(colCount: number, rowCount: number, scaleFactor: string) {
    const tileSize = getScaled(DEFAULT_TILE_SIZE, scaleFactor);
    const borderThickness = getScaled(DEFAULT_BORDER_THICKNESS, scaleFactor);

    const width = (colCount * tileSize) + (borderThickness * 2);
    const height = (rowCount * tileSize) + (borderThickness * 2);
    return [width, height];
}
