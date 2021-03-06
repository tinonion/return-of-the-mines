import React from "react";
import buildStyle, { Font, Color, Display } from "../css/StyleBuilder";
import RUserHeader from "./user_header/RUserHeader";
import { mockUser } from "../../entities/User";
import RBestGames from "./user_stats/RBestGames";
import RGameHistory from "./user_stats/RGameHistory";

const WIDTH = 375;

interface UserInfoProps {

}

export default function RUserInfo(props: UserInfoProps) {
    let style = buildStyle(Font.None, Color.Primary, Display.Flex);
    style.flexDirection = "column";
    style.width = WIDTH;
    style.padding = "10px";

    const user = mockUser();

    const historyHeaderStyle = buildStyle(Font.Title, Color.Primary, Display.Block);
    const gd = user.gameData;
    const totalGames = gd.gamesWon + gd.gamesLost + gd.gamesIncompleted;

    return (
        <div style={style}>
            <RUserHeader height="10%"
                         userData={user}/>
            <RBestGames height="35%"
                        bestBeginner={user.bestBeginner}
                        bestIntermediate={user.bestIntermediate}
                        bestExpert={user.bestExpert}/>
            <div style={historyHeaderStyle}>{`${totalGames} GAMES PLAYED`}</div>
            <RGameHistory height="50%"
                          gameData={user.gameData}/>
        </div>
    );
}