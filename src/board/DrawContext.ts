import Extents from "../util/Extents";

const TILE_SIZE = 23;
const BORDER_THICKNESS = 8;

export interface DrawContext {
    tileSize: number;
    borderThickness: number;
    totalWidth: number;
    totalHeight: number;
    tileExtents: Extents;
}

export function createDrawContext(rowSize: number, colSize: number): DrawContext {
    const width = (rowSize * TILE_SIZE) + (BORDER_THICKNESS * 2);
    const height = (colSize * TILE_SIZE) + (BORDER_THICKNESS * 2);
    return {
        tileSize: TILE_SIZE,
        borderThickness: BORDER_THICKNESS,
        totalWidth: width,
        totalHeight: height,
        tileExtents: new Extents(BORDER_THICKNESS,
                                 BORDER_THICKNESS,
                                 rowSize * TILE_SIZE,
                                 colSize * TILE_SIZE)
    }
}

export function inferCanvasSize(rowSize: number, colSize: number) {
    const width = (rowSize * TILE_SIZE) + (BORDER_THICKNESS * 2);
    const height = (colSize * TILE_SIZE) + (BORDER_THICKNESS * 2);
    return [width, height];
}
