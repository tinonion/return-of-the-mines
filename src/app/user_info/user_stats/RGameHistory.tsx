import React, { useRef } from "react";
import RGameChart from "./RGameChart";
import GameData from "../../../entities/GameData";
import buildStyle, { Font, Color, Display } from "../../css/StyleBuilder";
import RGameHistoryListings from "./RGameHistoryListings";

const PIE_CHART_SIZE = 170;

interface GameHistoryProps {
    height: string,
    gameData: GameData;
}

export default function RGameHistory(props: GameHistoryProps) {
    const style = buildStyle(Font.None, Color.ShallowBackground, Display.Flex);
    style.justifyContent = "space-between";
    style.height = props.height;

    const gameData = props.gameData;

    const controllerRef = useRef(null);
    return (
        <div style={style}>
            <RGameHistoryListings height={PIE_CHART_SIZE}
                                  won={gameData.gamesWon}
                                  lost={gameData.gamesLost}
                                  incomplete={gameData.gamesIncompleted}
                                  chartControllerRef={controllerRef}/>
            <RGameChart size={PIE_CHART_SIZE}
                        gameData={props.gameData}
                        controllerRef={controllerRef}/>;
        </div>
    );
}