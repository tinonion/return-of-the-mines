export interface TileDrawProps {
    baseColor: string;
    borderColor: string;
    borderThickness: number;
    imagePath: string | null;
    tileText: string | null;
}

// Tile state is only used to infer current drawing of tile, nothing about
// whether it has a mine or anything
export enum TileState {
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
    Flag
}

const IMAGE_PATH_MAP = new Map<string, string>([
    ["flag", "/board_images/red_dot.png"]
]);

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

export function TileDrawMap(tileVal: number) {
    const tileDrawMap = new Map<TileState, TileDrawProps>([
        [TileState.Unpressed, createDrawProps("grey", "black", 2, null, null)],
        [TileState.Pressed, createDrawProps("blue", "black", 2, null, null)],
        [TileState.Zero, createDrawProps("lightgray", "black", 2, null, null)],
        [TileState.Flag, createDrawProps("grey", "black", 2, null, "F")],
        [TileState.Mine, createDrawProps("grey", "black", 2, null, "M")],
        [TileState.One, createDrawProps("lightgray", "black", 2, null, "1")],
        [TileState.Two, createDrawProps("lightgray", "black", 2, null, "2")],
        [TileState.Three, createDrawProps("lightgray", "black", 2, null, "3")],
        [TileState.Four, createDrawProps("lightgray", "black", 2, null, "4")],
        [TileState.Five, createDrawProps("lightgray", "black", 2, null, "5")],
        [TileState.Six, createDrawProps("lightgray", "black", 2, null, "6")],
        [TileState.Seven, createDrawProps("lightgray", "black", 2, null, "7")],
        [TileState.Eight, createDrawProps("lightgray", "black", 2, null, "8")]
    ]);

    return tileDrawMap.get(tileVal);
}
