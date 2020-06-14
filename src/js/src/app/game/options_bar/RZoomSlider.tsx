import React, { useState } from "react";

import "../../css/Slider.css";
import { SliderProps, createMarks, createSliderTitle, createSliderStyle } from "./Slider";

const WIDTH = 200;
const MARKS = createMarks(WIDTH, [["0%", 0], ["100%", .33], ["200%", 1]]);
const TITLE = createSliderTitle("ZOOM");

// doesn't wrap a lower level slider component due to low fidelity
// value updates, instead uses functions from Slider.tsx
export default function RZoomSlider(props: SliderProps) {
    const [value, setValue] = useState("100");

    function changeValue(v: string) {
        const newValue = parseInt(v);
        const discretized = Math.floor((newValue + 5) / 10) * 10;
        setValue(discretized.toString());
    }

    return (
        <span style={createSliderStyle(WIDTH)}>
            {TITLE}
            <input onMouseUp={e => props.onMouseUp(e.currentTarget.value)}
                   onChange={e => changeValue(e.currentTarget.value)}
                   type="range" min="50" max="200" value={value} className="slider"/>
            <br/>
            {MARKS}
        </span>
    )
}