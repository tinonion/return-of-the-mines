import React from "react";

import { ValidatedOptions, GameOptions } from "../../../options/GameOptions";
import RDisplayMenu from "./RDisplayMenu";
import RDifficultyMenu from "./RDifficultyMenu";
import buildStyle, { Color, Display, Font } from "../../css/StyleBuilder";

interface OptionsBarProps {
    commitOptions: (q: keyof GameOptions, v: ValidatedOptions) => void
}

export default function ROptionsBar(props: OptionsBarProps) {
    let style = buildStyle(Font.Title, Color.Secondary, Display.Flex);
    style.height = "120px";

    return (
        <div style={style}>
            <RDifficultyMenu commitOptions={props.commitOptions}/> 
            <RDisplayMenu commitOptions={props.commitOptions}/>
        </div>
    );
}