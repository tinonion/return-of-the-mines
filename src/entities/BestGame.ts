import { Difficulty } from "../options/Difficulty";
import Replay from "./Replay";

export default interface BestGame {
    difficulty: Difficulty;
    time: number;
    replay: Replay;
}

export function createBestGame(difficulty: Difficulty, time: number) {
    return {
        difficulty: difficulty,
        time: time,
        replay: {}
    } as BestGame;
}