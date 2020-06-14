export default interface GameData {
    gamesWon: number,
    gamesLost: number,
    gamesIncompleted: number
}

export function createGameData(won: number, lost: number, incomplete: number) {
    return {
        gamesWon: won,
        gamesLost: lost,
        gamesIncompleted: incomplete
    } as GameData;
}