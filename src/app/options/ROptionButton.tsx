import React, { MouseEvent } from "react";

import "../css/OptionButton.css";

interface OptionButtonProps {
    onClick: (e: MouseEvent) => void,
}

export default function ROptionButton(props: OptionButtonProps) {

    return (
        <button className="option-button">
            *
        </button>
    );
}