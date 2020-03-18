import { TileState, createTiles } from "./tile";
import { DrawContext, createDrawContext } from "./DrawContext";
import * as boardDrawing from "./boardDrawing";
import Extents from "../util/Extents";
import * as arrayUtil from "../util/arrayUtil";

export default class Board {
    canvas: HTMLCanvasElement;
    drawContext: DrawContext;
    tiles: Array<Array<TileState>>;
    selectedTile: Array<number> | null;

    constructor(rowSize: number, colSize: number, boardCanvas: HTMLCanvasElement) {
        this.selectedTile = null;
        this.canvas = boardCanvas;
        this.drawContext = createDrawContext(rowSize, colSize);
        this.tiles = createTiles(rowSize, colSize);

        boardDrawing.initialDraw(this.canvas, this.drawContext);
    }

    reset() {
        const colSize = this.tiles[0].length;
        const rowSize = this.tiles.length;
        this.tiles = createTiles(rowSize, colSize);
        boardDrawing.initialDraw(this.canvas, this.drawContext);
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

    getSelectedState() {
        return this.tiles[this.selectedTile[0]][this.selectedTile[1]];
    }

    inTiles(x: number, y: number) {
        return this.drawContext.tileExtents.isInside(x, y);
    }

    inHeader(x: number, y: number) {
        return this.drawContext.headerExtents.isInside(x, y);
    }

    changeTileValue(tileCol: number, tileRow: number, tileState: TileState) {
        const tileExtents = this.getTileExtents(tileCol, tileRow);
        boardDrawing.redrawTile(tileExtents, this.canvas, tileState);
        this.tiles[tileCol][tileRow] = tileState;
    }


    handleMouseDown(canvasX: number, canvasY: number) {
        if (this.inHeader(canvasX, canvasY)) {
            // handle clicking the header
            this.reset();

        } else if (this.inTiles(canvasX, canvasY)) {
            // handle tile click
            const [tileCol, tileRow] = this.getTileInds(canvasX, canvasY);
            this.selectedTile = [tileCol, tileRow];
    
            if (this.tiles[tileCol][tileRow] === TileState.Unpressed) {
                // tile isn't revealed yet
                this.changeTileValue(tileCol, tileRow, TileState.Pressed);
            }
        }
    }

    handleMouseDrag(canvasX: number, canvasY: number) {
        if (!this.inTiles(canvasX, canvasY)) {
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

            if (this.tiles[tileCol][tileRow] === TileState.Unpressed) {
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
            console.log("caught missed drag correction");
            this.changeTileValue(this.selectedTile[0], this.selectedTile[1], TileState.Unpressed);
        }

        if (!this.inTiles(canvasX, canvasY)) {
            return;
        }

        this.changeTileValue(tileCol, tileRow, TileState.Zero);
        this.selectedTile = null;
    }
}