import React from "react";
import buildStyle, { Display, Font, Color } from "../../css/StyleBuilder";

interface BestGameRowProps {
    difficultyText: string,
    time: number
}

export default function RBestGameRow(props: BestGameRowProps) {
    const parentStyle = buildStyle(Font.Item, Color.ShallowBackground, Display.Flex);
    const childStyle = buildStyle(Font.Item, Color.ShallowBackground, Display.Block);

    parentStyle.justifyContent = "space-between";

    const timeText = `${props.time}s`;

    return (
        <div style={parentStyle}>
            <div style={childStyle}>{props.difficultyText}</div>           
            <div style={childStyle}>{timeText}</div>
        </div>
    );
}