export interface TileDrawProps {
    baseColor: string;
    borderColor: string;
    borderThickness: number;
}

function createDrawProps(
    baseColor: string, borderColor: string, borderThickness: number): TileDrawProps {
    return { 
        baseColor: baseColor,
        borderColor: borderColor,
        borderThickness: borderThickness
    };
}

export function TileDrawMap(tileVal: number) {
    const tileDrawMap = new Map([
        [-1, createDrawProps("light-grey", "black", 2)],
        [0, createDrawProps("blue", "black", 2)]
    ]);

    return tileDrawMap.get(tileVal);
}