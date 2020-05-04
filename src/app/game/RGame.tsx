import React, { useState } from "react";

import ROptionsBar from "./ROptionsBar";
import RBoard, { boardPropsAreEqual } from "./RBoard";
import { OptionFields, OptionPair, defaultOptionFields } from "../../options/OptionFields";
import { Options, defaultOptions } from "../../options/Options";
import { validateOptions } from "../../options/validation";

export default function RGame() {
    const [options, setOptions] = useState(defaultOptions());

    function commitOptions(optionFields: OptionFields) {
        console.log("committing options");
        setOptions(validateOptions(optionFields));
    }

    return (
        <div>
            <ROptionsBar commitOptions={commitOptions}/>
            <RBoard options={options}/>
        </div>
    );
}