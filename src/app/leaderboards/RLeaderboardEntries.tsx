import { LeaderboardCategory } from "../../entities/LeaderboardCategory";
import React from "react";
import buildStyle, { Font, Color, Display } from "../css/StyleBuilder";

function createEntryRows(category: LeaderboardCategory) {
    let entries = category.entries;
    let entryRows = []

    let rowStyle = buildStyle(Font.Item, Color.ShallowBackground, Display.Block);
    rowStyle.display = "flex";
    rowStyle.flexDirection = "row";
    rowStyle.justifyContent = "space-between";

    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const newRow = (
            <div key={i} style={rowStyle}>
                <div>
                    {`${i + 1}. ${entry.username.toUpperCase()}`}
                </div>
                <div>
                    {`${entry.time}s`}
                </div>
            </div>
        )

        entryRows.push(newRow);
    }

    return entryRows;
}

interface LeaderboardEntriesProps {
    category: LeaderboardCategory
}

export default function RLeaderboardEntries(props: LeaderboardEntriesProps) {
    const style = buildStyle(Font.None, Color.ShallowBackground, Display.Flex);
    style.flexDirection = "column";
    style.justifyContent = "space-between";
    style.height = "250px";
    style.marginTop = "20px";

    return (
        <div style={style}>
            {createEntryRows(props.category)}
        </div>
    );
}