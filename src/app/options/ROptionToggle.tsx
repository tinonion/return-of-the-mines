import React from "react";

import "../css/OptionToggle.css";

interface OptionButtonProps {
    text: string;
    selected: boolean;
    handleClick: VoidFunction;
}

export default function ROptionToggle(props: OptionButtonProps) {
    const selectedDescriptor = props.selected ? "selected" : "not-selected";

    return (
        <div className={"option-toggle " + selectedDescriptor} 
            onClick={props.handleClick}>
            {props.text}
        </div>
    );
}