import * as tileDrawing from "./tileDrawing";
import { randIntInRange } from "../../util/random";

export function createTiles(rowSize: number, colSize: number)
    : Array<Array<tileDrawing.TileState>> {
    
    let tiles = []

    for (let row = 0; row < colSize; row++) {
        let newRow: Array<tileDrawing.TileState> = [];

        for (let col = 0; col < rowSize; col++) {
            newRow.push(tileDrawing.TileState.Unpressed);
        }
        tiles.push(newRow);
    }
    return tiles;
}

export function generateMineMask(
    tiles: Array<Array<tileDrawing.TileState>>, startCol: number, startRow: number, mineCnt: number) {

    const maskWidth = tiles[0].length;
    const maskHeight = tiles.length;

    let placementPool = [];
    let mask = [];

    for (let row = 0; row < maskHeight; row++) {
        let maskRow = [];

        for (let col = 0; col < maskWidth; col++) {
            maskRow.push(false);

            if (row >= startRow - 1 && row <= startRow + 1 && col >= startCol - 1
                && col <= startCol + 1) {

                // is in 3x3 grace zone, no mines are allowed to spawn here
                continue;
            }

            placementPool.push([row, col]);
        }
        mask.push(maskRow);
    }

    for (let i = 0; i < mineCnt; i++) {
        // i is discarded
        // place one mine every iteration

        let placementInd = randIntInRange(0, placementPool.length);

        const [mineRow, mineCol] = placementPool[placementInd];
        placementPool.splice(placementInd, 1);

        mask[mineRow][mineCol] = true;
    }
        
    return mask;
}