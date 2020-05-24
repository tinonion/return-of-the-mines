import BestGame, { createBestGame } from "./BestGame";
import SavedGame from "./SavedGame";
import { Difficulty } from "../options/difficulty";

export default interface User {
    userName: string;
    bestBeginner: BestGame;
    bestIntermediate: BestGame;
    bestExpert: BestGame;
    gamesWon: number;
    gamesLost: number;
    gamesIncomplete: number;
    savedGame: SavedGame;
}

export function mockUser() {
    return {
        userName: "Willy Wonka",
        bestBeginner: createBestGame(Difficulty.Beginner, 1.5432),
        bestIntermediate: createBestGame(Difficulty.Intermediate, 13.6958),
        bestExpert: createBestGame(Difficulty.Expert, 76.2314),
        gamesWon: 145,
        gamesLost: 462,
        gamesIncomplete: 623,
        savedGame: {} as SavedGame
    } as User;
}