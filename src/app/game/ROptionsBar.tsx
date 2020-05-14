import React from "react";

import { ValidatedOptions, GameOptions } from "../../options/GameOptions";
import RDisplayMenu from "./RDisplayMenu";
import RDifficultyMenu from "./RDifficultyMenu";
import buildStyle, { Color, Display, Font } from "../css/StyleBuilder";

interface OptionsBarProps {
    commitOptions: (q: keyof GameOptions, v: ValidatedOptions) => void
}

let style = buildStyle(Font.Header, Color.DeepBackground, Display.Flex);
style.margin = "10px";

export default function ROptionsBar(props: OptionsBarProps) {
    return (
        <div style={style}>
            <RDifficultyMenu commitOptions={props.commitOptions}/> 
            <RDisplayMenu commitOptions={props.commitOptions}/>
        </div>
    );
}