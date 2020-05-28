import buildStyle, { Font, Color, Display } from "../css/StyleBuilder";
import React, { useState } from "react";
import { mockLeaderboardCategory } from "../../entities/LeaderboardCategory";
import { Difficulty } from "../../options/Difficulty";
import { TimeScale } from "../../options/TimeScale";
import RCategorySelector from "./RCategorySelector";
import RLeaderboardEntries from "./RLeaderboardEntries";

interface LeaderboardProps {

}

export default function RLeaderboards(props: LeaderboardProps) {
    const [selectedDifficulty, setSelectedDifficulty] = useState(Difficulty.Expert);
    const [selectedTimeScale, setSelectedTimeScale] = useState(TimeScale.AllTime);

    const parentStyle = buildStyle(Font.None, Color.ShallowBackground, Display.Block);
    parentStyle.padding = "10px";
    parentStyle.marginTop = "5px";
    parentStyle.width = "375px";

    const headerStyle = buildStyle(Font.Header, Color.ShallowBackground, Display.Block);

    const leaderboardCategory = mockLeaderboardCategory();

    const setTimeScale = (t: TimeScale) => { setSelectedTimeScale(t); }
    const setDifficulty = (d: Difficulty) => { setSelectedDifficulty(d); }

    return (
        <div style={parentStyle}>
            <div style={headerStyle}>LEADERBOARDS</div>
            <RCategorySelector selectedDifficulty={selectedDifficulty}
                               selectedTimeScale={selectedTimeScale}
                               setDifficulty={setDifficulty}
                               setTimeScale={setTimeScale}/>
            <RLeaderboardEntries category={leaderboardCategory}/>
        </div>
    );
}