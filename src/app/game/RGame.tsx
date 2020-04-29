import React, { useState } from "react";

import ROptionsBar from "./ROptionsBar";
import RBoard from "./RBoard";
import { Difficulty } from "../../board/difficulty";

export interface Options {
    difficulty: Difficulty;
    colCount: string,
    rowCount: string,
    mineCount: string
}

export type OptionPair = [keyof Options, string | Difficulty];

export default function RGame() {
    const [options, setOptions] = useState({
        difficulty: Difficulty.Expert,
        colCount: "30",
        rowCount: "16",
        mineCount: "99"
    });

    function changeOptions(newOptionPairs: Array<OptionPair>) {
        let newOptions: Options = Object.assign({}, options);
        for (let optionPair of newOptionPairs) {
            const optionKey = optionPair[0] as keyof Options;
            const newValue = optionPair[1]
            // @ts-ignore 
            newOptions[optionKey] = newValue;
        }
        setOptions(newOptions)
    }

    return (
        <div>
            <ROptionsBar changeOptions={changeOptions}
                         options={options}/>
            <RBoard/>
        </div>
    );
}