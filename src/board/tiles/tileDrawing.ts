import Extents from "../../util/Extents";
import { DrawContext } from "../DrawContext";
import { TILE_BORDER_THICKNESS } from "../boardDrawing";

export interface TileDrawProps {
    baseColor: string;
    borderColor: string;
    borderThickness: number;
    imagePath: string | null;
    tileText: string | null;
}

// Tile state is only used to infer current drawing of tile, nothing about
// whether it has a mine or anything
enum TileState {
    Unpressed,
    Pressed,
    Zero,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Mine,
    Flag,
    ExplodedMine
}

/*const IMAGE_PATH_MAP = new Map<string, string>([
    ["flag", "/board_images/red_dot.png"]
]);*/

function createDrawProps(
    baseColor: string, borderColor: string, 
    borderThickness: number, imagePath: string | null,
    tileText: string | null): TileDrawProps {
    return { 
        baseColor: baseColor,
        borderColor: borderColor,
        borderThickness: borderThickness,
        imagePath: imagePath,
        tileText: tileText
    };
}

const TILE_DRAW_MAP = new Map<TileState, TileDrawProps>([
    [TileState.Unpressed, createDrawProps("grey", "black", 2, null, null)],
    [TileState.Pressed, createDrawProps("lightgray", "black", 2, null, null)],
    [TileState.Zero, createDrawProps("lightgray", "black", 2, null, null)],
    [TileState.Flag, createDrawProps("grey", "black", 2, null, "F")],
    [TileState.Mine, createDrawProps("grey", "black", 2, null, "M")],
    [TileState.ExplodedMine, createDrawProps("red", "black", 2, null, "M")],
    [TileState.One, createDrawProps("lightgray", "black", 2, null, "1")],
    [TileState.Two, createDrawProps("lightgray", "black", 2, null, "2")],
    [TileState.Three, createDrawProps("lightgray", "black", 2, null, "3")],
    [TileState.Four, createDrawProps("lightgray", "black", 2, null, "4")],
    [TileState.Five, createDrawProps("lightgray", "black", 2, null, "5")],
    [TileState.Six, createDrawProps("lightgray", "black", 2, null, "6")],
    [TileState.Seven, createDrawProps("lightgray", "black", 2, null, "7")],
    [TileState.Eight, createDrawProps("lightgray", "black", 2, null, "8")]
]);


function drawTile(
    tileExtents: Extents, tileCanvas: HTMLCanvasElement, tileVal: number, drawContext: DrawContext
    ) {
    const tileDrawProps = TILE_DRAW_MAP.get(tileVal);
    
    let ctx = tileCanvas.getContext('2d');

    const color = tileDrawProps.baseColor;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.fillRect(tileExtents.left, tileExtents.top, 
        tileExtents.width, tileExtents.height);
    ctx.stroke();

    ctx.lineWidth = TILE_BORDER_THICKNESS;
    ctx.beginPath();
    ctx.rect(tileExtents.left, tileExtents.top, 
        tileExtents.width, tileExtents.height);
    ctx.stroke();

    if (tileDrawProps.tileText != null) {
        const tileSize = drawContext.tileSize;

        ctx.font = String(tileSize - 10) + "px bold Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";

        const x = tileExtents.left + (tileSize / 2);
        const y = tileExtents.top + (tileSize / 2) + 5;
        ctx.fillText(tileDrawProps.tileText, x, y);
    }

    /*
    if (tileDrawProps.imagePath != null) {
        // copy image into new one and assign load callback
        let img = new Image();
        img.src = tileDrawProps.imagePath

        const tileSize = drawContext.tileSize;
        img.onload = function () {
            ctx.drawImage(img,
            tileExtents.left, tileExtents.top,
            tileSize, tileSize);
        }
    } */
}

export { TileState, TILE_DRAW_MAP, drawTile };