import React from "react";
import buildStyle, { Color, Font, Display } from "../../css/StyleBuilder";
import User from "../../../entities/User";

interface UserHeaderProps {
    height: string,
    userData: User
}

export default function RUserHeader(props: UserHeaderProps) {
    let style = buildStyle(Font.None, Color.Primary, Display.Flex);
    style.height = props.height;
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