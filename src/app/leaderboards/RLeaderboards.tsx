import buildStyle, { Font, Color, Display } from "../css/StyleBuilder";
import React, { useState } from "react";
import { mockLeaderboardCategory } from "../../entities/LeaderboardCategory";
import { Difficulty } from "../../options/difficulty";
import { TimeScale } from "../../options/TimeScale";
import RCategorySelector from "./RCategorySelector";
import RLeaderboardEntries from "./RLeaderboardEntries";

interface LeaderboardProps {

}

export default function RLeaderboards(props: LeaderboardProps) {
    const [selectedDifficulty, setSelectedDifficulty] = useState(Difficulty.Expert);
    const [selectedTimeScale, setSelectedTimeScale] = useState(TimeScale.AllTime);

    const parentStyle = buildStyle(Font.None, Color.Primary, Display.Flex);
    parentStyle.flexDirection = "column";
    parentStyle.padding = "10px";
    parentStyle.paddingLeft = "30px";

    const headerStyle = buildStyle(Font.Header, Color.Primary, Display.Block);
    headerStyle.height = "10%";

    const leaderboardCategory = mockLeaderboardCategory();

    const setTimeScale = (t: TimeScale) => { setSelectedTimeScale(t); }
    const setDifficulty = (d: Difficulty) => { setSelectedDifficulty(d); }

    return (
        <div style={parentStyle}>
            <div style={headerStyle}>LEADERBOARDS</div>
            <RCategorySelector height="20%"
                               selectedDifficulty={selectedDifficulty}
                               selectedTimeScale={selectedTimeScale}
                               setDifficulty={setDifficulty}
                               setTimeScale={setTimeScale}/>
            <RLeaderboardEntries height="70%"
                                 category={leaderboardCategory}/>
        </div>
    );
}