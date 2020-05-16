import React, { ChangeEvent, CSSProperties } from "react";
import buildStyle, { Font, Color, Display } from "../css/StyleBuilder";

interface OptionFieldProps {
    enableInput: boolean;
    text: string;
    value: string;
    maxInputLength: number;
    onChange: (newValue: string) => void
}

export default function ROptionField(props: OptionFieldProps) {
    function changeField(e: ChangeEvent<HTMLInputElement>) {
        let newValue = e.currentTarget.value;
        if (newValue.length > props.maxInputLength) {
            newValue = newValue.substring(0, props.maxInputLength);
        } 

        props.onChange(newValue);
    }

    const parentStyle = buildStyle(Font.Item, Color.Foreground, Display.Inline);
    parentStyle.padding = "5px";

    const titleStyle = buildStyle(Font.Item, Color.Foreground, Display.Inline);

    const fieldStyle = buildStyle(Font.Item, Color.Foreground, Display.Inline);
    fieldStyle.width = (props.maxInputLength * 9).toString() + "px";
    fieldStyle.padding = "2px";
    fieldStyle.marginLeft = "3px";

    return (
        <div style={parentStyle}>
            <span style={titleStyle}>
                {props.text}
            </span>
            <input style={fieldStyle}
                    value={props.value}
                    type="text" 
                    disabled={!props.enableInput} 
                    onChange={(e) => { changeField(e); }}/>
        </div>
    );
}