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

    const style = buildStyle(Font.Item, Color.Foreground, Display.Inline);

    let parentStyle = Object.assign({}, style) as CSSProperties;
    parentStyle.padding = "3px";

    let titleStyle = Object.assign({}, style) as CSSProperties;

    let fieldStyle = Object.assign({}, style) as CSSProperties;
    fieldStyle.marginTop = "10px";
    fieldStyle.marginLeft = "5px";
    fieldStyle.width = (props.maxInputLength * 10).toString() + "px";
    fieldStyle.height = "14px";

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