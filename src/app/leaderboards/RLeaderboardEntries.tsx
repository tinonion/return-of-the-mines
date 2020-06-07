import { LeaderboardCategory } from "../../entities/LeaderboardCategory";
import React from "react";
import buildStyle, { Font, Color, Display } from "../css/StyleBuilder";

function createEntryRows(category: LeaderboardCategory) {
    let entries = category.entries;
    let entryRows = []

    let evenStyle = buildStyle(Font.Item, Color.Primary, Display.Flex);
    evenStyle.height = "100%";
    evenStyle.alignItems = "center";
    evenStyle.paddingLeft = "3px";

    let oddStyle = Object.assign({}, evenStyle);
    oddStyle.background = "lightgrey";

    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const newRow = (
            <div key={i} style={i % 2 === 0 ? oddStyle : evenStyle}>
                <span style={{ width: "40px" }}>
                    {`${i + 1}.`}
                </span>
                <span style={{ width: "280px" }}>
                    {entry.username.toUpperCase()}
                </span>
                <span style={{ width: "30px" }}>
                    {`${entry.time}s`}
                </span>
            </div>
        )

        entryRows.push(newRow);
    }

    return entryRows;
}

interface LeaderboardEntriesProps {
    height: string,
    category: LeaderboardCategory
}

export default function RLeaderboardEntries(props: LeaderboardEntriesProps) {
    const style = buildStyle(Font.None, Color.Primary, Display.Flex);
    style.flexDirection = "column";
    style.justifyContent = "space-between";
    style.height = props.height;

    return (
        <div style={style}>
            {createEntryRows(props.category)}
        </div>
    );
}