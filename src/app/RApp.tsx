import * as React from "react";

import RHeader from "./RHeader";
import RBoard from "./RBoard";

export default function App() {
    return (
        <div>
            <RHeader/>
            <RBoard rowSize={9}
                    colSize={9} />
        </div>
    )
}