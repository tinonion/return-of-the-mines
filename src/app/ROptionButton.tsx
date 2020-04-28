import React from "react";

import "./css/OptionButton.css";

interface OptionButtonProps {
    text: string;
    selected: boolean;
    handleClick: VoidFunction;
}

export default function ROptionButton(props: OptionButtonProps) {
    const selectedDescriptor = props.selected ? "selected" : "not-selected";

    return (
        <div className={"option-button " + selectedDescriptor} 
            onClick={props.handleClick}>
            {props.text}
        </div>
    );
}