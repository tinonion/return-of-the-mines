import * as tileDrawing from "./tileDrawing";

export function createTiles(rowSize: number, colSize: number)
    : Array<Array<tileDrawing.TileState>> {
    
    let tiles = []

    for (let row = 0; row < rowSize; row++) {
        let newRow: Array<tileDrawing.TileState> = [];

        for (let col = 0; col < colSize; col++) {
            newRow.push(tileDrawing.TileState.Unpressed);
        }
        tiles.push(newRow);
    }
    return tiles;
}