import React from "react";
import buildStyle, { Color, Font, Display } from "../../css/StyleBuilder";
import RLogin from "./RLogin";

interface UserHeaderProps {

}

export default function RUserHeader(props: UserHeaderProps) {

    let style = buildStyle(Font.None, Color.ShallowBackground, Display.Flex);
    style.width = 800;
    style.height = 40;
    style.padding = "13px";
    style.justifyContent = "space-between";

    return (
        <div style={style}>
            <div>User Info</div>
           <RLogin/> 
        </div>
    );
}