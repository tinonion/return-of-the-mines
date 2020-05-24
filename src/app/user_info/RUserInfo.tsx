import React from "react";
import buildStyle, { Font, Color, Display } from "../css/StyleBuilder";
import RUserHeader from "./user_header/RUserHeader";
import { mockUser } from "../../entities/User";
import RUserStats from "./user_stats/RUserStats";

interface UserInfoProps {

}

export default function RUserInfo(props: UserInfoProps) {
    let style = buildStyle(Font.None, Color.DeepBackground, Display.InlineBlock);
    style.width = 400;

    const user = mockUser();

    return (
        <div style={style}>
            <RUserHeader userData={user}/>
            <RUserStats userData={user}/>
        </div>
    );
}