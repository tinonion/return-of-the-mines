import GameData from "../../../entities/GameData";
import buildStyle, { Font, Color, Display } from "../../css/StyleBuilder";
import React from "react";
import { PieChartController } from "../../../chart/PieChartController";

function getPercentageString(total: number, part: number, name: string) {
    return `${((part / total) * 100).toFixed(1)}% ${name}`;
}

interface GameHistoryListingsProps {
    won: number,
    lost: number,
    incomplete: number,
    chartController: PieChartController 
}

export default function RGameHistoryListings(props: GameHistoryListingsProps) {
    function selectPiece(name: string) {
        props.chartController.selectionMap.get(name)();
    }

    function restoreChart() {
        props.chartController.restorePieChart();
    }

    const style = buildStyle(Font.Item, Color.ShallowBackground, Display.Flex);
    style.flexDirection = "column";
    style.justifyContent = "space-between";
    style.height = "100%";

    const total = props.won + props.lost + props.incomplete;

    return (
        <span style={{ display: "inline", height: "100%" }}>

            <div style={style}>
                <div style={{ marginTop: "50px" }}
                     onMouseOver={(e: any) => { selectPiece("WON"); }}
                     onMouseLeave={(e: any) => { restoreChart(); }}>
                    {getPercentageString(total, props.won, "WON")}
                </div>
                <div onMouseOver={(e: any) => { selectPiece("LOST"); }}
                     onMouseLeave={(e: any) => { restoreChart(); }}>
                    {getPercentageString(total, props.lost, "LOST")}
                </div>
                <div style={{ marginBottom: "50px" }}
                     onMouseOver={(e: any) => { selectPiece("INCOMPLETE"); }}
                     onMouseLeave={(e: any) => { restoreChart(); }}>
                    {getPercentageString(total, props.incomplete, "INCOMPLETE")}
                </div>
            </div>
        
        </span>
    );
}

