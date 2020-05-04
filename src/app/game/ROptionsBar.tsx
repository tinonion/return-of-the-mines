import React, { useState, ChangeEvent } from "react";

import { Difficulty, DIFFICULTY_MAP, DifficultyOptions } from "../../options/difficulty";
import ROptionToggle from "./ROptionToggle";
import ROptionField from "./ROptionField";
import ROptionButton from "./ROptionButton";

import "../css/OptionsBar.css";
import { OptionPair, OptionFields, defaultOptionFields } from "../../options/OptionFields";

interface OptionsBarProps {
    commitOptions: (o: OptionFields) => void
}

export default function ROptionsBar(props: OptionsBarProps) {
    const [optionFields, setOptionFields] = useState(defaultOptionFields());

    function changeDifficulty(newDifficulty: Difficulty) {
        let newOptions: OptionFields = Object.assign({}, optionFields);
        newOptions["difficulty"] = newDifficulty;

        if (newDifficulty !== Difficulty.Custom) { 
            const difficultyOptions = DIFFICULTY_MAP.get(newDifficulty);

            for (let pair of Object.entries(difficultyOptions)) {
                const optionKey = pair[0] as keyof OptionFields;
                const newValue = pair[1];

                // @ts-ignore
                newOptions[optionKey] = newValue;
            }
        }

        setOptionFields(newOptions);
    }

    function changeOptionField(qualifier: keyof OptionFields, e: ChangeEvent<HTMLInputElement>, maxInputLength: number) {
        let newOptions: OptionFields = Object.assign({}, optionFields);

        let newValue = e.currentTarget.value;
        if (newValue.length > maxInputLength) {
            newValue = newValue.substring(0, maxInputLength);
        } 

        // @ts-ignore
        newOptions[qualifier] = newValue;
        setOptionFields(newOptions);
    }

    let difficultySelections = new Array<boolean>(false, false, false, false);
    difficultySelections[optionFields.difficulty] = true;

    const enableDifficultyInput = optionFields.difficulty === Difficulty.Custom;

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
                <ROptionButton text="*"
                               onClick={(e) => { props.commitOptions(optionFields); }}/>
            </span>
            <span className="options-section">
                <div className="section-title">
                    Display
                </div>
            </span>
        </div>
    );
}