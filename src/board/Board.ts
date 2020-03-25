import { createTiles, generateMineMask } from "./tile/tileGen";
import { TileState } from "./tile/tileDrawing";
import { evaluateTile, NEIGHBOR_MATRIX } from "./tile/tileLogic";
import { DrawContext, createDrawContext } from "./DrawContext";
import * as boardDrawing from "./boardDrawing";
import Extents from "../util/Extents";
import * as arrayUtil from "../util/arrayUtil";

enum BoardState {
    Idle,
    InProgress,
    Lost,
    Won
}

export default class Board {
    boardState: BoardState;
    canvas: HTMLCanvasElement;
    drawContext: DrawContext;
    tiles: Array<Array<TileState>>;
    selectedTile: Array<number> | null;
    mineMask: Array<Array<boolean>> | null;
    revealedTileCnt: number;
    mineCnt: number;

    constructor(rowSize: number, colSize: number, boardCanvas: HTMLCanvasElement) {
        this.boardState = BoardState.Idle;
        this.selectedTile = null;
        this.canvas = boardCanvas;
        this.drawContext = createDrawContext(rowSize, colSize);
        this.tiles = createTiles(rowSize, colSize);
        this.mineMask = null;
        this.revealedTileCnt = 0;

        boardDrawing.initialDraw(this.canvas, this.drawContext);
    }

    reset() {
        const colSize = this.tiles.length;
        const rowSize = this.tiles[0].length;
        this.tiles = createTiles(rowSize, colSize);
        boardDrawing.initialDraw(this.canvas, this.drawContext);
        this.boardState = BoardState.Idle;
        this.revealedTileCnt = 0;
    }

    getTileInds(x: number, y: number) {
        // takes coords refed to canvas, ref to tile extents
        const tileX = x - this.drawContext.tileExtents.left;
        const tileY = y - this.drawContext.tileExtents.top;
        const tileSize = this.drawContext.tileSize;
        return [Math.floor(tileX / tileSize), Math.floor(tileY / tileSize)];
    }

    getTileExtents(tileCol: number, tileRow: number) {
        const tileSize = this.drawContext.tileSize;
        const tileExtents = this.drawContext.tileExtents;
        return new Extents(
            tileExtents.left + (tileCol * tileSize),
            tileExtents.top + (tileRow * tileSize),
            tileSize, tileSize);
    }

    getTileState(tileCol: number, tileRow: number) {
        return this.tiles[tileRow][tileCol];
    }

    getSelectedState() {
        return this.getTileState(this.selectedTile[0], this.selectedTile[1]);
    }

    inTiles(x: number, y: number) {
        return this.drawContext.tileExtents.isInside(x, y);
    }

    inHeader(x: number, y: number) {
        return this.drawContext.headerExtents.isInside(x, y);
    }

    isMine(tileCol: number, tileRow: number) {
        return this.mineMask[tileRow][tileCol];
    }

    changeTileValue(tileCol: number, tileRow: number, tileState: TileState) {
        const tileExtents = this.getTileExtents(tileCol, tileRow);
        boardDrawing.redrawTile(tileExtents, this.canvas, tileState, this.drawContext);
        this.tiles[tileRow][tileCol] = tileState;
    }

    loseGame() {
        this.boardState = BoardState.Lost;

        // reveal the mines
        for (let row = 0; row < this.mineMask.length; row++) {
            for (let col = 0; col < this.mineMask[0].length; col++) {
               const tileState = this.getTileState(col, row);
               
               if (this.mineMask[row][col] && tileState === TileState.Unpressed) {
                   this.changeTileValue(col, row, TileState.Mine);
               }
            }
        }
    }

    winGame() {
        this.boardState = BoardState.Won;

        console.log("wow, you won!");
    }

    cascadeRevelation(tileCol: number, tileRow: number) {
        if (!Extents.inMatrix(this.tiles, tileCol, tileRow)) {
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
        const totalTiles = this.tiles.length * this.tiles[0].length;
        if (this.revealedTileCnt === totalTiles - this.mineCnt) {
            this.winGame();
        } 

        const revealedState = evaluateTile(tileCol, tileRow, this.mineMask);
        this.changeTileValue(tileCol, tileRow, revealedState);

        if (revealedState === TileState.Zero) {
            NEIGHBOR_MATRIX.forEach(direction => {
                const adjPoint = [tileCol + direction[0], tileRow + direction[1]];

                if (Extents.inMatrix(this.tiles, adjPoint[0], adjPoint[1])) {
                    this.cascadeRevelation(adjPoint[0], adjPoint[1]);
                }
            });
        }
    }

    revealTile(tileCol: number, tileRow: number) {
        if (this.isMine(tileCol, tileRow)) {
            this.changeTileValue(tileCol, tileRow, TileState.ExplodedMine); 
            this.loseGame();

        } else {
            this.cascadeRevelation(tileCol, tileRow);
        }
    }

    handleLeftClick(canvasX: number, canvasY: number) {
        if (this.inHeader(canvasX, canvasY)) {
            // handle clicking the header
            this.reset();

        } else if (this.inTiles(canvasX, canvasY)) {
            if (this.boardState === BoardState.Lost) { return; }

            const [tileCol, tileRow] = this.getTileInds(canvasX, canvasY);
            if (this.boardState === BoardState.Idle) {
                // first click of the game, generate mines
                this.boardState = BoardState.InProgress;

                this.mineMask = generateMineMask(this.tiles, tileCol, tileRow, 10);
                this.mineCnt = 10;
            }

            // handle tile click
            this.selectedTile = [tileCol, tileRow];
    
            if (this.tiles[tileRow][tileCol] === TileState.Unpressed) {
                // tile isn't revealed yet
                this.changeTileValue(tileCol, tileRow, TileState.Pressed);
            }
        }
    }

    handleRightClick(canvasX: number, canvasY: number) {
        if (this.inTiles(canvasX, canvasY)) {
            if (this.boardState === BoardState.Lost) { return; }

            // handle flag placement with right click
            const [tileCol, tileRow] = this.getTileInds(canvasX, canvasY);
            const clickState = this.getTileState(tileCol, tileRow);

            if (clickState === TileState.Unpressed) {
                // place flag
                this.changeTileValue(tileCol, tileRow, TileState.Flag);

            } else if (clickState === TileState.Flag) {
                // remove flag
                this.changeTileValue(tileCol, tileRow, TileState.Unpressed);
            }

        }
    }

    handleMouseDrag(canvasX: number, canvasY: number) {
        if (!this.inTiles(canvasX, canvasY)) {
            if (this.boardState === BoardState.Lost) { return; }

            // dragged off of board
            if (this.selectedTile != null && this.getSelectedState() === TileState.Pressed) {
                const [selectedCol, selectedRow] = this.selectedTile;
                this.changeTileValue(selectedCol, selectedRow, TileState.Unpressed);
            }

            this.selectedTile = null;
            return;
        }

        if (this.selectedTile == null) {
            return;
        }

        const [tileCol, tileRow] = this.getTileInds(canvasX, canvasY);
        const [selectedCol, selectedRow] = this.selectedTile;
        const selectedTileExtents = this.getTileExtents(selectedCol, selectedRow);

        if (!selectedTileExtents.isInside(canvasX, canvasY)) {
            // cursor moved selection to another tile
            if (this.selectedTile != null && this.getSelectedState() === TileState.Pressed) {
                this.changeTileValue(
                    this.selectedTile[0], 
                    this.selectedTile[1], 
                    TileState.Unpressed); // set tile to depressed
            }

            if (this.tiles[tileRow][tileCol] === TileState.Unpressed) {
                this.changeTileValue(tileCol, tileRow, TileState.Pressed); // set tile to pressed
                this.selectedTile = [tileCol, tileRow];
            }
        }
    }

    handleMouseUp(canvasX: number, canvasY: number) {
        const [tileCol, tileRow] = this.getTileInds(canvasX, canvasY);
        if (this.selectedTile != null &&
            !arrayUtil.areEqual([tileCol, tileRow], this.selectedTile) &&
            this.getSelectedState() === TileState.Pressed) {
            // in the rare case where the drag event doesn't fire to
            // change the currently pressed tile to the one where
            // mouse up fired, it still needs to be unpressed
            this.changeTileValue(this.selectedTile[0], this.selectedTile[1], TileState.Unpressed);
        }

        // ignore if not in tiles or game is currently lost
        if (!this.inTiles(canvasX, canvasY)) { return; }
        if (this.boardState === BoardState.Lost) { return; }

        this.revealTile(tileCol, tileRow);
        this.selectedTile = null;
    }
}