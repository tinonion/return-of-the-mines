import React from "react";
import buildStyle, { Color, Font, Display } from "../../css/StyleBuilder";
import User from "../../../entities/User";

interface UserHeaderProps {
    userData: User
}

export default function RUserHeader(props: UserHeaderProps) {
    let style = buildStyle(Font.None, Color.ShallowBackground, Display.Flex);
    style.height = 40;
    style.justifyContent = "space-between";
    style.alignItems = "flex-end";

    let headerStyle = buildStyle(Font.Header, Color.None, Display.Block);
    let userInfoHeader = <div style={headerStyle}>
                            {props.userData.userName.toUpperCase()}
                         </div>;

    return (
        <div style={style}>
            {userInfoHeader}
        </div>
    );
}