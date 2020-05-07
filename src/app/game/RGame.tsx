import React, { useState } from "react";

import ROptionsBar from "./ROptionsBar";
import RBoard from "./RBoard";
import { defaultOptions, GameOptions, ValidatedOptions } from "../../options/GameOptions";
import RMineCounter from "./RMineCounter";

export default function RGame() {
    const [options, setOptions] = useState(defaultOptions());

    function commitOptions(qualifier: keyof GameOptions, validated: any) {
        let newOptions = Object.assign({}, options);
        // @ts-ignore
        newOptions[qualifier] = validated;
        setOptions(newOptions);
    }

    return (
        <div>
            <ROptionsBar commitOptions={commitOptions}/>
            <RMineCounter initialCount={options.difficultyOptions.mineCount}/>
            <br/>
            <RBoard options={options}/>
        </div>
    );
}