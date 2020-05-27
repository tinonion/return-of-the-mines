import GameData from "../../../entities/GameData";
import buildStyle, { Font, Color, Display } from "../../css/StyleBuilder";
import React from "react";

function getPercentage(total: number, part: number) {
    return ((part / total) * 100).toFixed(1);
}

interface GameHistoryListingsProps {
    won: number,
    lost: number,
    incomplete: number
}

export default function RGameHistoryListings(props: GameHistoryListingsProps) {
    const style = buildStyle(Font.Item, Color.ShallowBackground, Display.Flex);
    style.flexDirection = "column";
    style.justifyContent = "space-between";
    style.height = "100%";

    const total = props.won + props.lost + props.incomplete;
    const winPerc = getPercentage(total, props.won);
    const lossPerc = getPercentage(total, props.lost);
    const incPerc = getPercentage(total, props.incomplete);

    return (
        <span style={{ display: "inline", height: "100%" }}>

            <div style={style}>
                <div style={{ marginTop: "50px" }}>{`${winPerc}% WON`}</div>
                <div>{`${lossPerc}% LOST`}</div>
                <div style={{ marginBottom: "50px" }}>{`${incPerc}% INCOMPLETE`}</div>
            </div>
        
        </span>
    );
}

