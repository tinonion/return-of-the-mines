import React from "react";
import buildStyle, { Color, Font, Display } from "../../css/StyleBuilder";

interface LoginProps {

}

export default function RLogin(props: LoginProps) {

    let style = buildStyle(Font.Header, Color.Foreground, Display.Block);
    style.padding = "5px";

    return (
        <div style={style}>
           Login 
        </div>
    );
}