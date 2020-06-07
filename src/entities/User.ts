import BestGame, { createBestGame } from "./BestGame";
import SavedGame from "./SavedGame";
import { Difficulty } from "../options/difficulty";
import GameData, { createGameData } from "./GameData";

export default interface User {
    userName: string;
    bestBeginner: BestGame;
    bestIntermediate: BestGame;
    bestExpert: BestGame;
    gameData: GameData;
    savedGame: SavedGame;
}

export function mockUser() {
    return {
        userName: "Willy Wonka",
        bestBeginner: createBestGame(Difficulty.Beginner, 1.54),
        bestIntermediate: createBestGame(Difficulty.Intermediate, 13.69),
        bestExpert: createBestGame(Difficulty.Expert, 76.23),
        gameData: createGameData(1, 46, 623),
        savedGame: {} as SavedGame
    } as User;
}