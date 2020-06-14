import { DifficultyOptions } from "./DifficultyOptions";

enum Difficulty {
    Beginner,
    Intermediate,
    Expert,
    Custom
}

const DIFFICULTY_MAP = new Map<Difficulty, DifficultyOptions>([
    [Difficulty.Beginner, { 
        difficulty: Difficulty.Beginner,
        colCount: "9", 
        rowCount: "9", 
        mineCount: "10" 
    }],
    [Difficulty.Intermediate, {
        difficulty: Difficulty.Intermediate,
        colCount: "16",
        rowCount: "16",
        mineCount: "40"
    }],
    [Difficulty.Expert, {
        difficulty: Difficulty.Expert,
        colCount: "30",
        rowCount: "16",
        mineCount: "99"
    }],
    [Difficulty.Custom, {
        difficulty: Difficulty.Custom,
        colCount: "30",
        rowCount: "16",
        mineCount: "99"
    }]
]);

export { Difficulty, DIFFICULTY_MAP };