import Tiles from "./tiles/Tiles";
import { TileState } from "./tiles/tileDrawing";
import { DrawContext, createDrawContext } from "./DrawContext";
import * as boardDrawing from "./boardDrawing";
import * as tileDrawing from "./tiles/tileDrawing";
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
    tiles: Tiles;
    selectedTile: Array<number> | null;

    constructor(rowSize: number, colSize: number, boardCanvas: HTMLCanvasElement) {
        this.boardState = BoardState.Idle;
        this.canvas = boardCanvas;
        this.drawContext = createDrawContext(rowSize, colSize);
        this.tiles = new Tiles(rowSize, colSize, this);

        boardDrawing.initialDraw(this.canvas, this.drawContext);
    }

    reset() {
        this.tiles.reset();

        boardDrawing.initialDraw(this.canvas, this.drawContext);
        this.boardState = BoardState.Idle;
    }

    isBoardLocked() {
        return (this.boardState === BoardState.Lost || this.boardState === BoardState.Won);
    }

    getSelectedState() {
        return this.tiles.getTileState(this.selectedTile[0], this.selectedTile[1]);
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

    drawTile(tileCol: number, tileRow: number, tileState: tileDrawing.TileState) {
        const tileExtents = this.getTileExtents(tileCol, tileRow);
        tileDrawing.drawTile(tileExtents, this.canvas, tileState, this.drawContext);
    }

    inTiles(x: number, y: number) {
        return this.drawContext.tileExtents.isInside(x, y);
    }

    inHeader(x: number, y: number) {
        return this.drawContext.headerExtents.isInside(x, y);
    }

    loseGame() {
        this.tiles.revealMines();
        this.boardState = BoardState.Lost;
    }

    winGame() {
        this.boardState = BoardState.Won;

        console.log("wow, you won!");
    }

    handleLeftClick(canvasX: number, canvasY: number) {
        if (this.inHeader(canvasX, canvasY)) {
            // handle clicking the header
            this.reset();

        } else if (this.inTiles(canvasX, canvasY) && !this.isBoardLocked()) {
            const [tileCol, tileRow] = this.getTileInds(canvasX, canvasY);
            if (this.boardState === BoardState.Idle) {
                // first click of the game, generate mines
                this.boardState = BoardState.InProgress;

                this.tiles.placeMines(tileCol, tileRow, 10);
            }

            // handle tile click
            this.selectedTile = [tileCol, tileRow];
    
            if (this.tiles.getTileState(tileCol, tileRow) === TileState.Unpressed) {
                // tile isn't revealed yet
                this.tiles.changeTileState(tileCol, tileRow, TileState.Pressed);
            }
        }
    }

    handleRightClick(canvasX: number, canvasY: number) {
        if (this.isBoardLocked()) { return; }

        if (this.inTiles(canvasX, canvasY)) {
            // handle flag placement with right click
            const [tileCol, tileRow] = this.getTileInds(canvasX, canvasY);
            const tiles = this.tiles;
            const clickState = tiles.getTileState(tileCol, tileRow);

            if (clickState === TileState.Unpressed) {
                // place flag
                tiles.changeTileState(tileCol, tileRow, TileState.Flag);

            } else if (clickState === TileState.Flag) {
                // remove flag
                tiles.changeTileState(tileCol, tileRow, TileState.Unpressed);
            }

        }
    }

    handleMouseDrag(canvasX: number, canvasY: number) {
        if (this.isBoardLocked()) { return; }

        if (!this.inTiles(canvasX, canvasY)) {
            const tiles = this.tiles;

            // dragged off of board
            if (this.selectedTile != null && this.getSelectedState() === TileState.Pressed) {
                const [selectedCol, selectedRow] = this.selectedTile;
                tiles.changeTileState(selectedCol, selectedRow, TileState.Unpressed);
            }

            this.selectedTile = null;
            return;
        }

        if (this.selectedTile == null) {
            return;
        }

        const [tileCol, tileRow] = this.getTileInds(canvasX, canvasY);
        const tiles = this.tiles;

        const [selectedCol, selectedRow] = this.selectedTile;
        const selectedTileExtents = this.getTileExtents(selectedCol, selectedRow);

        if (!selectedTileExtents.isInside(canvasX, canvasY)) {
            // cursor moved selection to another tile
            if (this.selectedTile != null && this.getSelectedState() === TileState.Pressed) {
                tiles.changeTileState(
                    this.selectedTile[0], 
                    this.selectedTile[1], 
                    TileState.Unpressed); // set tile to depressed
            }

            if (this.tiles.getTileState(tileCol, tileRow) === TileState.Unpressed) {
                tiles.changeTileState(tileCol, tileRow, TileState.Pressed); // set tile to pressed
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
            this.tiles.changeTileState(this.selectedTile[0], this.selectedTile[1], TileState.Unpressed);
        }

        // ignore if not in tiles or game is currently lost
        if (!this.inTiles(canvasX, canvasY)) { return; }
        if (this.boardState === BoardState.Lost ||
            this.boardState === BoardState.Won) { return; }

        this.tiles.revealTile(tileCol, tileRow);
        this.selectedTile = null;
    }

    handleSpaceDown(canvasX: number, canvasY: number) {
        if (!this.inTiles(canvasX, canvasY)) { return; }
        if (this.boardState === BoardState.Lost ||
            this.boardState === BoardState.Won) { return; }

        const [tileCol, tileRow] = this.getTileInds(canvasX, canvasY);
        this.tiles.spaceRevealTile(tileCol, tileRow)
    }
}