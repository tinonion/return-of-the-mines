import React, { useState } from "react";

import ROptionsBar from "./ROptionsBar";
import RBoard from "./RBoard";
import { defaultOptions, GameOptions, ValidatedOptions } from "../../options/GameOptions";

export default function RGame() {
    const [options, setOptions] = useState(defaultOptions());

    function commitOptions(qualifier: keyof GameOptions, validated: ValidatedOptions) {
        let newOptions = Object.assign({}, options);
        newOptions[qualifier] = validated;
        setOptions(newOptions);
    }

    return (
        <div>
            <ROptionsBar commitOptions={commitOptions}/>
            <RBoard options={options}/>
        </div>
    );
}