import * as React from "react";

import RGame from "./game/RGame";
import RUserInfo from "./user_info/RUserInfo";
import RLeaderboards from "./leaderboards/RLeaderboards";

export default function App() {
    

    return (
        <div style={{padding: "10px"}}>
            <RGame/>
            <RUserInfo/>
            <RLeaderboards/>
        </div>
    );
}
