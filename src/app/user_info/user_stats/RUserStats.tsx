import User from "../../../entities/User";
import buildStyle, { Font, Color, Display } from "../../css/StyleBuilder";
import React from "react";
import RBestGames from "./RBestGames";

interface UserStatsProps {
    userData: User;
}

export default function RUserStats(props: UserStatsProps) {
    const userData = props.userData;

    let style = buildStyle(Font.None, Color.DeepBackground, Display.Flex);
    style.height = 100;

    return (
        <div style={style}>
            <RBestGames bestBeginner={userData.bestBeginner}
                        bestIntermediate={userData.bestIntermediate}
                        bestExpert={userData.bestExpert}/>
        </div>
    );
}