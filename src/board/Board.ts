import Tiles from "./tiles/Tiles";
import { TileState } from "./tiles/tileDrawing";
import { DrawContext, createDrawContext } from "./DrawContext";
import * as boardDrawing from "./boardDrawing";
import * as tileDrawing from "./tiles/tileDrawing";
import Extents from "../util/Extents";
import * as arrayUtil from "../util/arrayUtil";
import ProgressInterface from "./ProgressInterface";
import { GameOptions } from "../options/GameOptions";

enum GameState {
    Idle,
    InProgress,
    Lost,
    Won,
    QuickMenu
}

interface BoardSave {
    gameState: GameState;
    imageData: ImageData;
}

export default class Board {
    gameState: GameState;
    canvas: HTMLCanvasElement;
    drawContext: DrawContext;
    tiles: Tiles;
    selectedTile: Array<number> | null;
    save: BoardSave | null;
    progressInterface: ProgressInterface; 

    constructor(options: GameOptions, boardCanvas: HTMLCanvasElement, progressInterface: ProgressInterface) {
        const diffOptions = options.difficultyOptions;
        const displayOptions = options.displayOptions;

        this.canvas = boardCanvas;
        this.progressInterface = progressInterface;

        this.drawContext = createDrawContext(diffOptions.colCount, 
                                             diffOptions.rowCount,
                                             displayOptions.scaleFactor);
        this.tiles = new Tiles(diffOptions.colCount, 
                               diffOptions.rowCount, 
                               diffOptions.mineCount, 
                               this);

        this.gameState = GameState.Idle;
        this.progressInterface.resetGame();
        boardDrawing.initialDraw(this.canvas, this.drawContext);
    }

    reset() {
        this.tiles.reset();
        this.progressInterface.resetGame();

        boardDrawing.initialDraw(this.canvas, this.drawContext);
        this.gameState = GameState.Idle;
    }

    saveState() {
        const canvasRect = this.canvas.getBoundingClientRect();
        let ctx = this.canvas.getContext("2d");

        const imageData = ctx.getImageData(0, 0, canvasRect.width, canvasRect.height);

        this.save = { gameState: this.gameState, imageData: imageData };
    }

    restoreState() {
        if (this.save == null) {
            console.log("saved state was null");
            return;
        }

        const save = this.save;
        const ctx = this.canvas.getContext("2d");

        this.gameState = save.gameState;
        ctx.putImageData(save.imageData, 0, 0);
    }

    isBoardLocked() {
        return (this.gameState === GameState.Lost || this.gameState === GameState.Won
                || this.gameState === GameState.QuickMenu);
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

    loseGame() {
        this.tiles.revealMines();
        this.gameState = GameState.Lost;
        this.progressInterface.endGame();
    }

    winGame() {
        this.gameState = GameState.Won;
        this.progressInterface.endGame();

        console.log("wow, you won!");
    }

    startGame(tileCol: number, tileRow: number) {
        // first click of the game, generate mines
        this.gameState = GameState.InProgress;
        this.tiles.placeMines(tileCol, tileRow);
        this.progressInterface.startGame();
    }

    showQuickMenu() {
        if (this.gameState === GameState.QuickMenu) { return; }

        this.saveState();
        this.gameState = GameState.QuickMenu;
        boardDrawing.drawQuickMenu(this.canvas, this.drawContext);
    }

    hideQuickMenu() {
        if (this.gameState !== GameState.QuickMenu) { return; }

        this.restoreState();
    }

    placeFlag(tileCol: number, tileRow: number) {
        this.progressInterface.markMine();
        this.tiles.changeTileState(tileCol, tileRow, TileState.Flag);
    }

    removeFlag(tileCol: number, tileRow: number) {
        this.progressInterface.unmarkMine();
        this.tiles.changeTileState(tileCol, tileRow, TileState.Unpressed);
    }

    toggleFlagPlacement(tileCol: number, tileRow: number) {
        const tileState = this.tiles.getTileState(tileCol, tileRow);

        if (tileState === TileState.Unpressed) {
            this.placeFlag(tileCol, tileRow);

        } else if (tileState === TileState.Flag) {
            this.removeFlag(tileCol, tileRow);
        }
    }

    handleLeftClick(canvasX: number, canvasY: number) {
        if (this.inTiles(canvasX, canvasY) && !this.isBoardLocked()) {
            const [tileCol, tileRow] = this.getTileInds(canvasX, canvasY);
            if (this.gameState === GameState.Idle) {
                this.startGame(tileCol, tileRow);
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

            this.toggleFlagPlacement(tileCol, tileRow)
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
        if (this.gameState === GameState.Lost ||
            this.gameState === GameState.Won) { return; }

        this.tiles.clickTile(tileCol, tileRow);
        this.selectedTile = null;
    }

    handleSpaceDown(canvasX: number, canvasY: number) {
        if (!this.inTiles(canvasX, canvasY)) { return; }
        if (this.gameState === GameState.Lost ||
            this.gameState === GameState.Won) { return; }

        const [tileCol, tileRow] = this.getTileInds(canvasX, canvasY);
        this.toggleFlagPlacement(tileCol, tileRow);
        this.tiles.spaceRevealTile(tileCol, tileRow)
    }

    handleNKeyDown() {
        if (this.gameState === GameState.QuickMenu) {
            this.reset();
        }
    }
}