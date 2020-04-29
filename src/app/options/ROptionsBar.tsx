import React, { useState, ChangeEvent } from "react";

import { Difficulty, DIFFICULTY_MAP, DifficultyOptions } from "../../board/difficulty";
import { validateRange } from "../../util/validation";
import ROptionToggle from "./ROptionToggle";
import ROptionField from "./ROptionField";
import ROptionButton from "./ROptionButton";

import "../css/OptionsBar.css";

interface OptionFields {
    colCount: string,
    rowCount: string,
    mineCount: string
}

export default function ROptionsBar() {
    const [difficulty, setDifficulty] = useState(Difficulty.Expert);
    const [optionFields, setOptionFields] = useState({
        colCount: "30",
        rowCount: "16",
        mineCount: "99"
    });

    function changeOptionField(qualifier: keyof OptionFields, e: ChangeEvent<HTMLInputElement>, maxInputLength: number) {
        let newValue = e.currentTarget.value;
        if (newValue.length > maxInputLength) {
            newValue = newValue.substring(0, maxInputLength);
        } 

        let newOptions = Object.assign({}, optionFields);
        newOptions[qualifier] = newValue;
        setOptionFields(newOptions); 
    }

    let difficultySelections = new Array<boolean>(false, false, false, false);
    difficultySelections[difficulty] = true;

    const enableDifficultyInput = difficulty === Difficulty.Custom;

    return (
        <div className="options-bar">
            <span className="options-section">
                <div className="section-title">
                    Difficulty
                </div>
                <ROptionToggle text="Beginner"
                               selected={difficultySelections[0]}
                               handleClick={() => 
                                    { setDifficulty(Difficulty.Beginner); }}/>
                <ROptionToggle text="Intermediate"
                               selected={difficultySelections[1]}
                               handleClick={() => 
                                    { setDifficulty(Difficulty.Intermediate); }}/>
                <ROptionToggle text="Expert"
                               selected={difficultySelections[2]}
                               handleClick={() => 
                                    { setDifficulty(Difficulty.Expert); }}/>
                <ROptionToggle text="Custom"
                               selected={difficultySelections[3]}
                               handleClick={() => 
                                    { setDifficulty(Difficulty.Custom); }}/>
                <br/>
                <div className="horizontal-space"/>
                <ROptionField enableInput={enableDifficultyInput}
                              text="Width"
                              maxInputLength={2}
                              value={optionFields.colCount}
                              onChange={(e: ChangeEvent<HTMLInputElement>, maxInputLength: number) => {
                                  changeOptionField("colCount", e, maxInputLength);
                              }}/>
                <ROptionField enableInput={enableDifficultyInput}
                              text="Height"
                              maxInputLength={2}
                              value={optionFields.rowCount}
                              onChange={(e: ChangeEvent<HTMLInputElement>, maxInputLength: number) => {
                                    changeOptionField("rowCount", e, maxInputLength);
                              }}/>                              
                <ROptionField enableInput={enableDifficultyInput}
                              text="Mines"
                              maxInputLength={4}
                              value={optionFields.mineCount}
                              onChange={(e: ChangeEvent<HTMLInputElement>, maxInputLength: number) => {
                                    changeOptionField("mineCount", e, maxInputLength);
                              }}/>
                <ROptionButton onClick={() => {}}/>
            </span>
            <span className="options-section">
                <div className="section-title">
                    Display
                </div>
            </span>
        </div>
    );
}