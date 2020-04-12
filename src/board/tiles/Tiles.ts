import { createTiles, generateMineMask } from "./tileGen";
import { evaluateTile, NEIGHBOR_MATRIX } from "./tileLogic";
import Board from "../Board";
import { TileState } from "./tileDrawing";
import Extents from "../../util/Extents";

export default class Tiles {
    board: Board;
    tileStates: Array<Array<TileState>>;
    mineMask: Array<Array<boolean>>;
    revealedTileCnt: number;
    mineCnt: number;

    constructor(rowSize: number, colSize: number, board: Board) {
        this.board = board;
        this.tileStates = createTiles(rowSize, colSize);
        this.mineMask = null;
        this.revealedTileCnt = 0;
    }

    reset() {
        const colSize = this.tileStates.length;
        const rowSize = this.tileStates[0].length;
        this.tileStates = createTiles(rowSize, colSize);
        this.revealedTileCnt = 0
    }

    getTileState(tileCol: number, tileRow: number) {
        return this.tileStates[tileRow][tileCol];
    }

    isMine(tileCol: number, tileRow: number) {
        return this.mineMask[tileRow][tileCol];
    }

    changeTileState(tileCol: number, tileRow: number, newState: TileState) {
        this.tileStates[tileRow][tileCol] = newState;
        this.board.drawTile(tileCol, tileRow, newState);
    }

    placeMines(clickCol: number, clickRow: number, mineCnt: number) {
        this.mineCnt = mineCnt;
        this.mineMask = generateMineMask(this.tileStates, clickCol, clickRow, mineCnt);
    }

    revealMines() {
        for (let row = 0; row < this.mineMask.length; row++) {
            for (let col = 0; col < this.mineMask[0].length; col++) {
                const tileState = this.getTileState(col, row);
                
                if (this.mineMask[row][col] && tileState === TileState.Unpressed) {
                    this.changeTileState(col, row, TileState.Mine);
                }
            }
        }
    }

    cascadeRevelation(tileCol: number, tileRow: number) {
        if (!Extents.inMatrix(this.tileStates, tileCol, tileRow)) {
            // point must be inside tile matrix
            return;
        }

        if (this.getTileState(tileCol, tileRow) !== TileState.Unpressed &&
            this.getTileState(tileCol, tileRow) !== TileState.Pressed) {
            // can only cascade reveal for unrevealed tiles
            return;
        }

        // revealing tile
        this.revealedTileCnt += 1;

        // check if game has been won
        const totalTiles = this.tileStates.length * this.tileStates[0].length;
        if (this.revealedTileCnt === totalTiles - this.mineCnt) {
            this.board.winGame();
        } 

        const revealedState = evaluateTile(tileCol, tileRow, this.mineMask);
        this.changeTileState(tileCol, tileRow, revealedState);

        if (revealedState === TileState.Zero) {
            NEIGHBOR_MATRIX.forEach(direction => {
                const adjPoint = [tileCol + direction[0], tileRow + direction[1]];

                if (Extents.inMatrix(this.tileStates, adjPoint[0], adjPoint[1])) {
                    this.cascadeRevelation(adjPoint[0], adjPoint[1]);
                }
            });
        }
    }

    revealTile(tileCol: number, tileRow: number) {
        if (this.isMine(tileCol, tileRow)) {
            this.changeTileState(tileCol, tileRow, TileState.ExplodedMine); 
            this.board.loseGame();

        } else {
            this.cascadeRevelation(tileCol, tileRow);
        }
    }

}