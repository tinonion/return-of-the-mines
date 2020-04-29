import * as React from "react";
import "./css/App.css";

import RBoard from "./RBoard";
import ROptionsBar from "./options/ROptionsBar";

export default function App() {
    return (
        <div className="test-app">
            <ROptionsBar/>
            <RBoard/>
        </div>
    );
}
