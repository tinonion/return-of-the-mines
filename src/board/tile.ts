export interface TileDrawProps {
    baseColor: string;
    borderColor: string;
    borderThickness: number;
    contentsColor: null | string;
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
    Flagged
}

function createDrawProps(
    baseColor: string, borderColor: string, borderThickness: number, contentsColor: null | string): TileDrawProps {
    return { 
        baseColor: baseColor,
        borderColor: borderColor,
        borderThickness: borderThickness,
        contentsColor: contentsColor
    };
}

export function TileDrawMap(tileVal: number) {
    const tileDrawMap = new Map<TileState, TileDrawProps>([
        [TileState.Unpressed, createDrawProps("grey", "black", 2, null)],
        [TileState.Pressed, createDrawProps("blue", "black", 2, null)],
        [TileState.Zero, createDrawProps("orange", "black", 2, null)]
    ]);

    return tileDrawMap.get(tileVal);
}

export function createTiles(rowSize: number, colSize: number)
    : Array<Array<TileState>> {
    
    let tiles = []

    for (let row = 0; row < rowSize; row++) {
        let newRow: Array<TileState> = [];

        for (let col = 0; col < colSize; col++) {
            newRow.push(TileState.Unpressed);
        }
        tiles.push(newRow);
    }
    return tiles;
}