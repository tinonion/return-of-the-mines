export interface LeaderboardEntry {
    username: string,
    time: number
}

export function mockEntry() {
    return {
        username: "Chuck Norris",
        time: 63.4
    } as LeaderboardEntry;
}