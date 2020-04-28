import React from "react";

import "./css/SideMenu.css";

export default function RSideMenu() {

    return (
        <div className="side-menu">
            <div className="sub-menu">
                <div className="sub-menu-title">
                    Difficulty
                </div>
                <button className="strip-button">
                    Beginner
                </button>
                <button className="strip-button">
                    Intermediate
                </button>
                <button className="strip-button">
                    Expert
                </button>
            </div>
            <div className="sub-menu">
                <span className = "sub-menu-title">
                    Display
                </span>
            </div>
        </div>
    );
}