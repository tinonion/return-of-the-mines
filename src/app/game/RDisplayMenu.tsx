import React, { useState } from "react";
import RSubMenu from "./RSubMenu";
import { ValidatedOptions, GameOptions } from "../../options/GameOptions";
import ROptionToggle from "./ROptionToggle";
import { defaultDisplayOptions, DisplayOptions } from "../../options/DisplayOptions";

interface DisplayMenuProps {
    commitOptions: (o: keyof GameOptions, v: ValidatedOptions) => void
}

export default function RDisplayMenu(props: DisplayMenuProps) {
    const [displayOptions, setDisplayOptions] = useState(defaultDisplayOptions());

    function changeDisplayOption(k: keyof DisplayOptions, v: any) {
        let newOptions = Object.assign({}, displayOptions);
        // @ts-ignore
        newOptions[k] = v;
        setDisplayOptions(newOptions);
    }

    const [showMineCount, showTimer] 
        = [displayOptions.showMineCount, displayOptions.showTimer];

    const children = (<React.Fragment>
       <ROptionToggle text="Mines"
                      selected={showMineCount}
                      handleClick={() => 
                        { changeDisplayOption("showMineCount", !showMineCount) }}/>
       <br/>
       <ROptionToggle text="Timer"
                      selected={showTimer}
                      handleClick={() => 
                        { changeDisplayOption("showTimer", !showTimer); }}/>
    </React.Fragment>);

    return (
       <RSubMenu title="Display"
                 children={children}/> 
    );
}