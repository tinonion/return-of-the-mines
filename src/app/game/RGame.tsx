import React, { useState, useRef } from "react";

import ROptionsBar from "./ROptionsBar";
import RBoard from "./RBoard";
import { defaultOptions, GameOptions } from "../../options/GameOptions";
import RProgressMenu from "./RProgressMenu";
import ProgressInterface from "../../board/ProgressInterface";

export default function RGame() {
    const [options, setOptions] = useState(defaultOptions());
    const progressInterface = useRef(null);

    function commitOptions(qualifier: keyof GameOptions, validated: any) {
        let newOptions = Object.assign({}, options);
        // @ts-ignore
        newOptions[qualifier] = validated;
        setOptions(newOptions);
    }

    const progressMenu = <RProgressMenu collectProgressInterface={(i: ProgressInterface) => 
                                            { progressInterface.current = i;}}
                                        initialCount={options.difficultyOptions.mineCount}
                                        hasMineCounter={options.displayOptions.showMineCount}
                                        hasTimer={options.displayOptions.showTimer}/>

    return (
        <div>
            <ROptionsBar commitOptions={commitOptions}/>
            {progressMenu}
            <br/>
            <RBoard options={options}
                    progressInterface={progressInterface}/>
        </div>
    );
}