import React from "react";
import buildStyle, { Font, Color, Display } from "../css/StyleBuilder";
import RUserHeader from "./user_header/RUserHeader";

interface UserInfoProps {

}

export default function RUserInfo(props: UserInfoProps) {
    let style = buildStyle(Font.None, Color.DeepBackground, Display.InlineBlock);

    return (
        <div style={style}>
            <RUserHeader/>
        </div>
    );
}