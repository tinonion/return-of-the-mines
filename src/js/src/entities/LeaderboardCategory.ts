import { LeaderboardEntry, mockEntry } from "./LeaderboardEntry";
import { Difficulty } from "../options/difficulty";
import { TimeScale } from "../options/TimeScale";

export interface LeaderboardCategory {
    difficulty: Difficulty,
    timeScale: TimeScale,
    entries: Array<LeaderboardEntry>
}

export function mockLeaderboardCategory() {
    let entries = []

    for (let i = 0; i < 10; i++) {
        entries.push(mockEntry());
    }

    return {
        difficulty: Difficulty.Expert,
        timeScale: TimeScale.AllTime,
        entries: entries
    } as LeaderboardCategory;
}