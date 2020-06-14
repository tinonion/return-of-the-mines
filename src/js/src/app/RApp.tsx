import * as React from "react";

import RGame from "./game/RGame";
import RUserInfo from "./user_info/RUserInfo";
import RLeaderboards from "./leaderboards/RLeaderboards";
import buildStyle, { Font, Color, Display } from "./css/StyleBuilder";

export default function App() {
    const appStyle = buildStyle(Font.None, Color.Secondary, Display.Flex);
    appStyle.flexDirection = "column";
    appStyle.padding = "10px";
    appStyle.alignItems = "center";

    const infoStyle = buildStyle(Font.None, Color.None, Display.Flex);
    infoStyle.flexDirection = "row";
    infoStyle.justifyContent = "center";
    infoStyle.height = "360px";

    return (
        <div style={appStyle}>
            <RGame/>
            <div style={{ height: "20px"}}/>
            <div style={infoStyle}>
                <RUserInfo/>
                <RLeaderboards/>
            </div>
        </div>
    );
}
