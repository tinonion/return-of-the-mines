import * as React from "react";
import "./css/App.css";

import RHeader from "./RHeader";
import RBoard from "./RBoard";

export default function App() {
    return (
        <div className="app">
            <RHeader/>
            <RBoard rowSize={9}
                    colSize={9}/>
        </div>
    )
}