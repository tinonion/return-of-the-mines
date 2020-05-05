import React, { useState, ChangeEvent } from "react";

import RDifficultyMenu from "./RDifficultyMenu";

import "../css/OptionsBar.css";
import { ValidatedOptions, GameOptions } from "../../options/GameOptions";

interface OptionsBarProps {
    commitOptions: (q: keyof GameOptions, v: ValidatedOptions) => void
}

export default function ROptionsBar(props: OptionsBarProps) {
    return (
        <div className="options-bar">
            <RDifficultyMenu commitOptions={props.commitOptions}/> 
            <span className="options-section">
                <div className="section-title">
                    Display
                </div>
            </span>
        </div>
    );
}