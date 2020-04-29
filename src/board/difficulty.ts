enum Difficulty {
    Beginner,
    Intermediate,
    Expert,
    Custom
}

export interface DifficultyOptions {
    colCount: string,
    rowCount: string,
    mineCount: string
}

const DIFFICULTY_MAP = new Map<Difficulty, DifficultyOptions>([
    [Difficulty.Beginner, { 
        colCount: "9", 
        rowCount: "9", 
        mineCount: "10" 
    }],
    [Difficulty.Intermediate, {
        colCount: "16",
        rowCount: "16",
        mineCount: "40"
    }],
    [Difficulty.Expert, {
        colCount: "30",
        rowCount: "16",
        mineCount: "99"
    }],
    [Difficulty.Custom, {
        colCount: "30",
        rowCount: "16",
        mineCount: "99"
    }]
]);

export { Difficulty, DIFFICULTY_MAP };