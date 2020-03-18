import Extents from "../util/Extents";

const TILE_SIZE = 23;
const BORDER_THICKNESS = 8;
const HEADER_HEIGHT = 90;

export interface DrawContext {
    tileSize: number;
    borderThickness: number;
    totalWidth: number;
    totalHeight: number;
    headerExtents: Extents;
    tileExtents: Extents;
}

export function createDrawContext(rowSize: number, colSize: number): DrawContext {
    const width = (rowSize * TILE_SIZE) + (BORDER_THICKNESS * 2)
    const height = (colSize * TILE_SIZE) + (BORDER_THICKNESS * 3) + (HEADER_HEIGHT)
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
                                 rowSize * TILE_SIZE,
                                 colSize * TILE_SIZE)
    }
}

export function inferCanvasSize(rowSize: number, colSize: number) {
    const width = (rowSize * TILE_SIZE) + (BORDER_THICKNESS * 2)
    const height = (colSize * TILE_SIZE) + (BORDER_THICKNESS * 3) + (HEADER_HEIGHT)
    return [width, height];
}
