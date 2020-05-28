import React, { useRef, useEffect, useCallback } from "react";
import GameData from "../../../entities/GameData";
import { createPieChart, getSelectionMap } from "../../../chart/PieChart";
import { DataPair } from "../../../chart/DataPair";
import { PieChartController, populateChartController } from "../../../chart/PieChartController";
import { drawPieChart } from "../../../chart/pieChartDrawing";

interface GameChartProps {
    size: number;
    gameData: GameData;
    chartController: PieChartController;
}

export default function RGameChart(props: GameChartProps) {
    const canvasRef = useRef(null);

    const createChart = useCallback((ref: HTMLCanvasElement) => {
        canvasRef.current = ref;        
    }, []);

    useEffect(() => {
        const gameData = props.gameData;
        const dataPairs: Array<DataPair> = [["WON", gameData.gamesWon],
                                            ["LOST", gameData.gamesLost],
                                            ["INCOMPLETE", gameData.gamesIncompleted]];

        const pieChart = createPieChart(props.size, dataPairs);

        const selectionMap = getSelectionMap(canvasRef.current, pieChart);
        function drawChart() { 
            drawPieChart(canvasRef.current, pieChart); 
        }
        populateChartController(props.chartController, selectionMap, drawChart);

        drawChart();
    });

    return (
        <span style={{ marginTop: "auto", marginBottom: "auto" }}>
            <canvas ref={createChart}
                    width={props.size}
                    height={props.size} />
        </span>
    );
}