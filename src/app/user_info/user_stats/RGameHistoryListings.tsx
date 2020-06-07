import buildStyle, { Font, Color, Display } from "../../css/StyleBuilder";
import React, { useState, useEffect, useRef } from "react";
import { PieChartController } from "../../../chart/PieChartController";

function getPercentageString(total: number, part: number, name: string) {
    return `${((part / total) * 100).toFixed(1)}% ${name}`;
}

function getListingColor(isSelected: boolean) {
    return isSelected ? "lightgrey" : "black";
}

interface GameHistoryListingsProps {
    height: number,
    won: number,
    lost: number,
    incomplete: number,
    chartControllerRef: React.MutableRefObject<PieChartController>
}

export default function RGameHistoryListings(props: GameHistoryListingsProps) {
    function selectPiece(name: string) {
        props.chartControllerRef.current.selectionMap.get(name)();

        if (name === "WON") {
            setSelections([true, false, false]);

        } else if (name === "LOST") {
            setSelections([false, true, false]);

        } else {
            setSelections([false, false, true]);
        }
    }

    function restoreChart() {
        props.chartControllerRef.current.restorePieChart();
        setSelections([false, false, false]);
    }

    const [selections, setSelections] = useState([false, false, false]);

    const style = buildStyle(Font.Item, Color.Primary, Display.Flex);
    style.flexDirection = "column";
    style.justifyContent = "space-between";
    style.height = props.height;

    const total = props.won + props.lost + props.incomplete;

    const spacerStyle = { height: "15%" };

    return (
         <span style={{ display: "inline", height: "100%" }}>

            <div style={style}>
                <div style={spacerStyle}/>
                <div style={{ color: getListingColor(selections[0]) }}
                     onMouseOver={(e: any) => { selectPiece("WON"); }}
                     onMouseLeave={(e: any) => { restoreChart(); }}>
                    {getPercentageString(total, props.won, "WON")}
                </div>
                <div style={{ color: getListingColor(selections[1]) }}
                     onMouseOver={(e: any) => { selectPiece("LOST"); }}
                     onMouseLeave={(e: any) => { restoreChart(); }}>
                    {getPercentageString(total, props.lost, "LOST")}
                </div>
                <div style={{ color: getListingColor(selections[2]) }}
                     onMouseOver={(e: any) => { selectPiece("INCOMPLETE"); }}
                     onMouseLeave={(e: any) => { restoreChart(); }}>
                    {getPercentageString(total, props.incomplete, "INCOMPLETE")}
                </div>
                <div style={spacerStyle}/>
            </div>
        
        </span>
    );
}

