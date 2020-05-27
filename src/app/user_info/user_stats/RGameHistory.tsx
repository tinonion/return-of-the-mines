import React from "react";
import RGameChart from "./RGameChart";
import GameData from "../../../entities/GameData";
import buildStyle, { Font, Color, Display } from "../../css/StyleBuilder";
import RGameHistoryListings from "./RGameHistoryListings";

interface GameHistoryProps {
    gameData: GameData;
}

export default function RGameHistory(props: GameHistoryProps) {
    const style = buildStyle(Font.None, Color.ShallowBackground, Display.Flex);
    style.justifyContent = "space-between";
    style.marginTop = "10px";
    style.height = "170px";

    const gameData = props.gameData;

    return (
        <div style={style}>
            <RGameHistoryListings won={gameData.gamesWon}
                                  lost={gameData.gamesLost}
                                  incomplete={gameData.gamesIncompleted}/>
            <RGameChart gameData={props.gameData}
                        size={170}/>
        </div>
    );
}