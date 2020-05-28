import { Difficulty } from "../../options/Difficulty";
import { TimeScale } from "../../options/TimeScale";
import React from "react";
import buildStyle, { Font, Color, Display } from "../css/StyleBuilder";
import ROptionToggle from "../game/options_bar/ROptionToggle";

interface CategorySelectorProps {
    selectedDifficulty: Difficulty,
    selectedTimeScale: TimeScale,
    setDifficulty: (d: Difficulty) => void,
    setTimeScale: (t: TimeScale) => void
}

export default function RCategorySelector(props: CategorySelectorProps) {
    const parentStyle = buildStyle(Font.None, Color.ShallowBackground, Display.Block);
    const rowStyle = {
        display: "flex",
        flex: "row",
        marginTop: "10px"
    }

    const timeScaleSelections = [false, false, false];
    timeScaleSelections[props.selectedTimeScale] = true;

    const difficultySelections = [false, false, false, false];
    difficultySelections[props.selectedDifficulty] = true;

    return (
        <div style={parentStyle}>
            <div style={rowStyle}>
                <ROptionToggle text={"ALL TIME"} 
                               selected={timeScaleSelections[0]} 
                               handleClick={() => { props.setTimeScale(TimeScale.AllTime); }}/>
                <ROptionToggle text={"WEEKLY"} 
                               selected={timeScaleSelections[1]} 
                               handleClick={() => { props.setTimeScale(TimeScale.Weekly); }}/>
                <ROptionToggle text={"DAILY"} 
                               selected={timeScaleSelections[2]} 
                               handleClick={() => { props.setTimeScale(TimeScale.Daily); }}/>
            </div>
            <div style={rowStyle}>
                <ROptionToggle text={"EXPERT"} 
                               selected={difficultySelections[2]} 
                               handleClick={() => { props.setDifficulty(Difficulty.Expert); }}/>
                <ROptionToggle text={"INTERMEDIATE"} 
                               selected={difficultySelections[1]} 
                               handleClick={() => { props.setDifficulty(Difficulty.Intermediate); }}/>
                <ROptionToggle text={"BEGINNER"} 
                               selected={difficultySelections[0]} 
                               handleClick={() => { props.setDifficulty(Difficulty.Beginner); }}/>
            </div>
        </div>
    );
}
