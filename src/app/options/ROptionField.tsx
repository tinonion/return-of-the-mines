import React, { ChangeEvent, CSSProperties } from "react";

import "../css/OptionField.css";

interface OptionFieldProps {
    enableInput: boolean;
    text: string;
    value: string;
    maxInputLength: number;
    onChange: (e: ChangeEvent<HTMLInputElement>, maxInputLength: number) => void;
}

export default function ROptionField(props: OptionFieldProps) {
    const widthProp: CSSProperties = { width: props.maxInputLength * 8 };

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
                    onChange={(e) => { props.onChange(e, props.maxInputLength); }}/>
        </div>
    );
}