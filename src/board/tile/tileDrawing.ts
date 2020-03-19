export interface TileDrawProps {
    baseColor: string;
    borderColor: string;
    borderThickness: number;
    imagePath: string | null;
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
    borderThickness: number, contentImage: string | null): TileDrawProps {
    return { 
        baseColor: baseColor,
        borderColor: borderColor,
        borderThickness: borderThickness,
        imagePath: contentImage
    };
}

export function TileDrawMap(tileVal: number) {
    const tileDrawMap = new Map<TileState, TileDrawProps>([
        [TileState.Unpressed, createDrawProps("grey", "black", 2, null)],
        [TileState.Pressed, createDrawProps("blue", "black", 2, null)],
        [TileState.Zero, createDrawProps("orange", "black", 2, null)],
        [TileState.Flag, createDrawProps("grey", "black", 2, IMAGE_PATH_MAP.get("flag"))]
    ]);

    return tileDrawMap.get(tileVal);
}
