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

    const style = buildStyle(Font.None, Color.ShallowBackground, Display.Flex);

    style.flexDirection = "column";
    style.justifyContent = "space-between";
    style.height = "70px";
    style.marginTop = "10px";

    const beginnerText = "BEST BEGINNER";
    const intermediateText = "BEST INTERMEDIATE";
    const expertText = "BEST EXPERT";

    return (
        <div style={style}>
            <RBestGameRow difficultyText={beginnerText} time={props.bestBeginner.time}/>
            <RBestGameRow difficultyText={intermediateText} time={props.bestIntermediate.time}/>
            <RBestGameRow difficultyText={expertText} time={props.bestExpert.time}/>
        </div>
    );
}