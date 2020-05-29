import BestGame from "../../../entities/BestGame";
import React from "react";
import buildStyle, { Font, Color, Display } from "../../css/StyleBuilder";
import RBestGameRow from "./RBestGameRow";

interface BestGamesProps {
    height: string,
    bestBeginner: BestGame,
    bestIntermediate: BestGame,
    bestExpert: BestGame    
}

export default function RBestGames(props: BestGamesProps) {

    const style = buildStyle(Font.None, Color.ShallowBackground, Display.Flex);

    style.flexDirection = "column";
    style.justifyContent = "space-around";
    style.height = props.height;

    const beginnerText = "BEST BEGINNER";
    const intermediateText = "BEST INTERMEDIATE";
    const expertText = "BEST EXPERT";

    const spacerStyle = { height: "15%" };

    return (
        <div style={style}>
            <div id="top-spacer" style={spacerStyle}/>
            <RBestGameRow difficultyText={expertText} time={props.bestExpert.time}/>
            <RBestGameRow difficultyText={intermediateText} time={props.bestIntermediate.time}/>
            <RBestGameRow difficultyText={beginnerText} time={props.bestBeginner.time}/>
            <div id="bottom-spacer" style={spacerStyle}/>
        </div>
    );
}