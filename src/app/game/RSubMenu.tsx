import React from "react";

import "../css/SubMenu.css";

interface SubMenuProps {
    title: string,
    children: Array<JSX.Element>,
}

export default function RSubMenu(props: SubMenuProps) {
    return (
        <span className="sub-menu">
            <div className="menu-title">
                {props.title}
            </div>
            {props.children}
        </span>
    );
}