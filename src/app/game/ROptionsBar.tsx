import React from "react";

import "../css/OptionsBar.css";

import { ValidatedOptions, GameOptions } from "../../options/GameOptions";
import RDisplayMenu from "./RDisplayMenu";
import RDifficultyMenu from "./RDifficultyMenu";

interface OptionsBarProps {
    commitOptions: (q: keyof GameOptions, v: ValidatedOptions) => void
}

export default function ROptionsBar(props: OptionsBarProps) {
    return (
        <div className="options-bar">
            <RDifficultyMenu commitOptions={props.commitOptions}/> 
            <RDisplayMenu commitOptions={props.commitOptions}/>
        </div>
    );
}