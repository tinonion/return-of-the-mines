import * as React from "react";
import "./css/App.css";

import RHeader from "./RHeader";
import RBoard from "./RBoard";
import RSideMenu from "./RSideMenu";
import ROptionsBar from "./ROptionsBar";

export default function App() {
    return (
        <div className="test-app">
            <ROptionsBar/>
            <RBoard/>
        </div>
    )
}
