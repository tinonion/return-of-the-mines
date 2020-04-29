import React, { useState, ChangeEvent } from "react";

import { Difficulty, DIFFICULTY_MAP, DifficultyOptions } from "../../board/difficulty";
import ROptionToggle from "./ROptionToggle";
import ROptionField from "./ROptionField";
import ROptionButton from "./ROptionButton";
import { Options, OptionPair } from "./RGame";

import "../css/OptionsBar.css";

interface OptionsBarProps {
    changeOptions: (newOptionPairs: Array<OptionPair>)
        => void,
    options: Options,
}

export default function ROptionsBar(props: OptionsBarProps) {
    function changeDifficulty(newDifficulty: Difficulty) {
        let newOptionPairs = new Array<OptionPair>(); 
        newOptionPairs.push(["difficulty", newDifficulty])

        if (newDifficulty !== Difficulty.Custom) { 
            const difficultyOptions = DIFFICULTY_MAP.get(newDifficulty);

            for (let pair of Object.entries(difficultyOptions)) {
                const optionKey = pair[0] as keyof Options;
                const newValue = pair[1];

                newOptionPairs.push([optionKey, newValue]);
            }
        }

        props.changeOptions(newOptionPairs);
    }

    function changeOptionField(qualifier: keyof Options, e: ChangeEvent<HTMLInputElement>, maxInputLength: number) {
        let newValue = e.currentTarget.value;
        if (newValue.length > maxInputLength) {
            newValue = newValue.substring(0, maxInputLength);
        } 

        props.changeOptions([[qualifier, newValue]]); 
    }

    let options = props.options;

    let difficultySelections = new Array<boolean>(false, false, false, false);
    difficultySelections[options.difficulty] = true;

    const enableDifficultyInput = options.difficulty === Difficulty.Custom;

    return (
        <div className="options-bar">
            <span className="options-section">
                <div className="section-title">
                    Difficulty
                </div>
                <ROptionToggle text="Beginner"
                               selected={difficultySelections[0]}
                               handleClick={() => 
                                    { changeDifficulty(Difficulty.Beginner); }}/>
                <ROptionToggle text="Intermediate"
                               selected={difficultySelections[1]}
                               handleClick={() => 
                                    { changeDifficulty(Difficulty.Intermediate); }}/>
                <ROptionToggle text="Expert"
                               selected={difficultySelections[2]}
                               handleClick={() => 
                                    { changeDifficulty(Difficulty.Expert); }}/>
                <ROptionToggle text="Custom"
                               selected={difficultySelections[3]}
                               handleClick={() => 
                                    { changeDifficulty(Difficulty.Custom); }}/>
                <br/>
                <div className="horizontal-space"/>
                <ROptionField enableInput={enableDifficultyInput}
                              text="Width"
                              maxInputLength={2}
                              value={options.colCount}
                              onChange={(e: ChangeEvent<HTMLInputElement>, maxInputLength: number) => {
                                  changeOptionField("colCount", e, maxInputLength);
                              }}/>
                <ROptionField enableInput={enableDifficultyInput}
                              text="Height"
                              maxInputLength={2}
                              value={options.rowCount}
                              onChange={(e: ChangeEvent<HTMLInputElement>, maxInputLength: number) => {
                                    changeOptionField("rowCount", e, maxInputLength);
                              }}/>                              
                <ROptionField enableInput={enableDifficultyInput}
                              text="Mines"
                              maxInputLength={4}
                              value={options.mineCount}
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