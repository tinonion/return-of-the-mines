import React, { useState } from "react";
import RSubMenu from "./RSubMenu";
import ROptionToggle from "./ROptionToggle";
import ROptionField from "./ROptionField";
import ROptionButton from "./ROptionButton";
import * as diffOptions from "../../options/DifficultyOptions";
import { Difficulty, DIFFICULTY_MAP } from "../../options/difficulty";
import { GameOptions, ValidatedOptions } from "../../options/GameOptions";

interface DifficultyMenuProps {
    commitOptions: (q: keyof GameOptions, v: ValidatedOptions) => void
}

export default function RDifficultyMenu(props: DifficultyMenuProps) {
    const [difficultyFields, setDifficultyFields] = useState(diffOptions.defaultDifficultyOptions());

    function onCommit(e: any) {
        const validated = diffOptions.validateDifficultyOptions(difficultyFields); 

        props.commitOptions("difficultyOptions", validated);
        
        // change fields to reflect changes from validation
        const validatedFields = {
            difficulty: validated.difficulty,
            colCount: validated.colCount.toString(),
            rowCount: validated.rowCount.toString(),
            mineCount: validated.mineCount.toString(),
        } as diffOptions.DifficultyOptions;

        setDifficultyFields(validatedFields);
    }

    function changeOptionField(qualifier: keyof diffOptions.DifficultyOptions, newValue: string) {
        let newOptions = Object.assign({}, difficultyFields);
        // @ts-ignore
        newOptions[qualifier] = newValue;
        setDifficultyFields(newOptions);
    }

    function changeDifficulty(newDifficulty: Difficulty) {
        let newOptions = Object.assign({}, difficultyFields);
        newOptions["difficulty"] = newDifficulty;

        if (newDifficulty !== Difficulty.Custom) { 
            const difficultyOptions = DIFFICULTY_MAP.get(newDifficulty);

            for (let pair of Object.entries(difficultyOptions)) {
                const optionKey = pair[0] as keyof diffOptions.DifficultyOptions;
                const newValue = pair[1];

                // @ts-ignore
                newOptions[optionKey] = newValue;
            }
        }

        setDifficultyFields(newOptions);
    }

    const changeRowCount = (newValue: string) => {
        changeOptionField("rowCount", newValue);
    }

    const changeColCount = (newValue: string) => {
        changeOptionField("colCount", newValue);
    }

    const changeMineCount = (newValue: string) => {
        changeOptionField("mineCount", newValue);
    }

    let difficultySelections = new Array<boolean>(false, false, false, false);
    difficultySelections[difficultyFields.difficulty] = true;

    const enableDifficultyInput = difficultyFields.difficulty === Difficulty.Custom;

    const inlineButtons = true;

    const children = (
    <React.Fragment>

        <div>
            <ROptionToggle inline={inlineButtons}
                        text="Beginner"
                        selected={difficultySelections[0]}
                        handleClick={() => 
                                { changeDifficulty(Difficulty.Beginner); }}/>
            <ROptionToggle inline={inlineButtons}
                        text="Intermediate"
                        selected={difficultySelections[1]}
                        handleClick={() => 
                                { changeDifficulty(Difficulty.Intermediate); }}/>
            <ROptionToggle inline={inlineButtons}
                        text="Expert"
                        selected={difficultySelections[2]}
                        handleClick={() => 
                                { changeDifficulty(Difficulty.Expert); }}/>
            <ROptionToggle inline={inlineButtons}
                        text="Custom"
                        selected={difficultySelections[3]}
                        handleClick={() => 
                                { changeDifficulty(Difficulty.Custom); }}/>
        </div>

        <div style={{
            }}>
            <ROptionField enableInput={enableDifficultyInput}
                        text="Width"
                        maxInputLength={2}
                        value={difficultyFields.colCount}
                        onChange={changeColCount}/>
            <ROptionField enableInput={enableDifficultyInput}
                        text="Height"
                        maxInputLength={2}
                        value={difficultyFields.rowCount}
                        onChange={changeRowCount}/>
            <ROptionField enableInput={enableDifficultyInput}
                        text="Mines"
                        maxInputLength={4}
                        value={difficultyFields.mineCount}
                        onChange={changeMineCount}/>
            <span style={{marginLeft: "5px"}}/>
            <ROptionButton text="*" onClick={onCommit}/>
        </div>

    </React.Fragment>);

    return (
       <RSubMenu title={"Difficulty"}
                 children={children}/>
    );
}