import React from "react";
import buildStyle, { Display, Font, Color } from "../css/StyleBuilder";

interface SubMenuProps {
    title: string,
    children: JSX.Element
}

export default function RSubMenu(props: SubMenuProps) {
    let parentStyle = buildStyle(Font.Header, Color.ShallowBackground, Display.Flex);
    parentStyle.flexDirection = "column";
    parentStyle.justifyContent = "space-between";
    parentStyle.marginRight = "5px";
    parentStyle.padding = "10px";

    let titleStyle = buildStyle(Font.Header, Color.ShallowBackground, Display.Block);

    return (
        <div style={parentStyle}>
            <div style={titleStyle}>
                {props.title}
            </div>
            {props.children}
        </div>
    );
}