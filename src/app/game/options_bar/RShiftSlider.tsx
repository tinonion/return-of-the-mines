import { SliderProps, createMarks, createSliderTitle, createSliderStyle } from "./Slider";
import { useState } from "react";
import React from "react";

const WIDTH = 200;
const MARKS = createMarks(WIDTH, [["0%", 0], ["50%", 0.5], ["100%", 1]]);
const TITLE = createSliderTitle("BOARD SHIFT");

export default function RShiftSlider(props: SliderProps) {
    const [value, setValue] = useState(0);

    return (
        <span style={createSliderStyle(WIDTH)}>
            {TITLE}
            <input onMouseUp={e => props.onMouseUp(e.currentTarget.value)} 
                   onChange={e => setValue(parseInt(e.currentTarget.value))}
                   type="range" min="0" max="100" value={value} className="slider"/>
            <br/>
            {MARKS}
        </span>        
    );
}