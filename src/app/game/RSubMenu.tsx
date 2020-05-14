import React from "react";
import buildStyle, { Display, Font, Color } from "../css/StyleBuilder";

interface SubMenuProps {
    title: string,
    children: JSX.Element
}

export default function RSubMenu(props: SubMenuProps) {
    let parentStyle = buildStyle(Font.Header, Color.ShallowBackground, Display.InlineBlock);
    parentStyle.marginRight = "5px";
    parentStyle.height = "90px";
    parentStyle.padding = "10px";

    let titleStyle = buildStyle(Font.Header, Color.ShallowBackground, Display.Block);

    return (
        <span style={parentStyle}>
            <div style={titleStyle}>
                {props.title}
            </div>
            {props.children}
        </span>
    );
}