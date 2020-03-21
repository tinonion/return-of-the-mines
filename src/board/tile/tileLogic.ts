import Extents from "../../util/Extents";
import { TileState } from "./tileDrawing";

export const NEIGHBOR_MATRIX = [
    [0, 1],
    [1, 1],
    [1, 0],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [1, -1],
    [-1, 1]
];

const TILE_MINE_CNT_MAP = new Map([
    [0, TileState.Zero],
    [1, TileState.One],
    [2, TileState.Two],
    [3, TileState.Three],
    [4, TileState.Four],
    [5, TileState.Five],
    [6, TileState.Six],
    [7, TileState.Seven],
    [8, TileState.Eight],
]);

export function evaluateTile(tileCol: number, tileRow: number, mineMask: Array<Array<boolean>>) {
    let mineSum = 0

    NEIGHBOR_MATRIX.forEach(direction => {
        const adjPoint = [tileCol + direction[0], tileRow + direction[1]];
        
        if (Extents.inMatrix(mineMask, adjPoint[0], adjPoint[1]) &&
            mineMask[adjPoint[1]][adjPoint[0]]) {
            
           mineSum += 1; 
        }
    });

    return TILE_MINE_CNT_MAP.get(mineSum);
}