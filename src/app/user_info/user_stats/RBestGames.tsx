import BestGame from "../../../entities/BestGame";
import React from "react";
import buildStyle, { Font, Color, Display } from "../../css/StyleBuilder";
import RBestGameRow from "./RBestGameRow";

interface BestGamesProps {
    bestBeginner: BestGame,
    bestIntermediate: BestGame,
    bestExpert: BestGame    
}

export default function RBestGames(props: BestGamesProps) {

    const parentStyle = buildStyle(Font.None, Color.ShallowBackground, Display.Flex);
    const childStyle = buildStyle(Font.Item, Color.Foreground, Display.Block);

    parentStyle.flexDirection = "column";
    parentStyle.justifyContent = "space-between";
    parentStyle.padding = "10px";
    parentStyle.width = "100%";
    parentStyle.height = "70px";

    const beginnerText = "BEST BEGINNER";
    const intermediateText = "BEST INTERMEDIATE";
    const expertText = "BEST EXPERT";

    return (
        <div style={parentStyle}>
            <RBestGameRow difficultyText={beginnerText} time={props.bestBeginner.time}/>
            <RBestGameRow difficultyText={intermediateText} time={props.bestIntermediate.time}/>
            <RBestGameRow difficultyText={expertText} time={props.bestExpert.time}/>
        </div>
    );
}