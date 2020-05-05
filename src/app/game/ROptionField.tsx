import React, { ChangeEvent, CSSProperties } from "react";

import "../css/OptionField.css";

interface OptionFieldProps {
    enableInput: boolean;
    text: string;
    value: string;
    maxInputLength: number;
    onChange: (newValue: string) => void
}

export default function ROptionField(props: OptionFieldProps) {
    const widthProp: CSSProperties = { width: props.maxInputLength * 8 };

    function changeField(e: ChangeEvent<HTMLInputElement>) {
        let newValue = e.currentTarget.value;
        if (newValue.length > props.maxInputLength) {
            newValue = newValue.substring(0, props.maxInputLength);
        } 

        props.onChange(newValue);
    }

    return (
        <div className="option-field">
            <span className="field-title">
                {props.text}
            </span>
            <input className="input-field"
                    style={widthProp}
                    value={props.value}
                    type="text" 
                    disabled={!props.enableInput} 
                    onChange={(e) => { changeField(e); }}/>
        </div>
    );
}