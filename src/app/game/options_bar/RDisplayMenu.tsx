import React, { useState } from "react";
import RSubMenu from "./RSubMenu";
import { ValidatedOptions, GameOptions } from "../../../options/GameOptions";
import ROptionToggle from "./ROptionToggle";
import { defaultDisplayOptions, DisplayOptions } from "../../../options/DisplayOptions";
import RZoomSlider from "./RZoomSlider";
import RShiftSlider from "./RShiftSlider";

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
        props.commitOptions("displayOptions", newOptions);
    }

    const [showMineCount, showTimer] 
        = [displayOptions.showMineCount, displayOptions.showTimer];

    const children = (
    <div style={{display: "flex"}}>
        
        <div style={{display: "inline-block"}}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%"
            }}>
                <ROptionToggle text="MINES"
                                selected={showMineCount}
                                handleClick={() => 
                                { changeDisplayOption("showMineCount", !showMineCount) }}/>

                <ROptionToggle text="TIMER"
                                selected={showTimer}
                                handleClick={() => 
                                { changeDisplayOption("showTimer", !showTimer); }}/>
            </div>
        </div>

        <span style={{marginLeft: "15px"}}/>

        <RZoomSlider onMouseUp={v => changeDisplayOption("scaleFactor", v)}/>

        <span style={{marginLeft: "15px"}}/>

        <RShiftSlider onMouseUp={v => changeDisplayOption("boardShift", v)}/>
    </div>);

    return (
       <RSubMenu title="DISPLAY"
                 children={children}/> 
    );
}