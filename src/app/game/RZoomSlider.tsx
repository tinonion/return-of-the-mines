import React, { useState } from "react";

import "../css/ZoomSlider.css";

interface ZoomSliderProps {
    onMouseUp: (v: string) => void,
    value: string
}

export default function RZoomSlider(props: ZoomSliderProps) {
    const [value, setValue] = useState("100");

    function changeValue(v: string) {
        const newValue = parseInt(v);
        const discretized = Math.floor((newValue + 5) / 10) * 10;
        setValue(discretized.toString());
    }

    return (
        <span className="range-slider">
            <div className="title">
                Zoom
            </div>
            <input onMouseUp={e => props.onMouseUp(e.currentTarget.value)} 
                   onChange={e => changeValue(e.currentTarget.value)}
                   type="range" min="50" max="200" value={value} className="slider"/>
            <br/>
            <span className="mark50">
                50%
            </span>
            <span className="mark100">
                100%
            </span>
            <span className="mark200">
                200%
            </span>
        </span>
    )
}