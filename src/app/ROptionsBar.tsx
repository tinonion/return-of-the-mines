import React, { useState } from "react";

import { Difficulty, DIFFICULTY_MAP } from "../board/difficulty";
import ROptionButton from "./ROptionButton";

import "./css/OptionsBar.css";

export default function ROptionsBar() {
    const [difficulty, setDifficulty] = useState(Difficulty.Expert);

    function selectBeginner() {
        setDifficulty(Difficulty.Beginner);
    }

    let difficultySelections = new Array<boolean>(false, false, false, false);
    difficultySelections[difficulty] = true;

    return (
        <div className="options-bar">
            <span className="options-section">
                <div className="section-title">
                    Difficulty
                </div>
                <ROptionButton text="Beginner"
                               selected={difficultySelections[0]}
                               handleClick={() => 
                                    { setDifficulty(Difficulty.Beginner); }}/>
                <ROptionButton text="Intermediate"
                               selected={difficultySelections[1]}
                               handleClick={() => 
                                    { setDifficulty(Difficulty.Intermediate); }}/>
                <ROptionButton text="Expert"
                               selected={difficultySelections[2]}
                               handleClick={() => 
                                    { setDifficulty(Difficulty.Expert); }}/>
                <ROptionButton text="Custom"
                               selected={difficultySelections[3]}
                               handleClick={() => 
                                    { setDifficulty(Difficulty.Custom); }}/>
            </span>
            <span className="options-section">
                <div className="section-title">
                    Display
                </div>
            </span>
        </div>
    );
}