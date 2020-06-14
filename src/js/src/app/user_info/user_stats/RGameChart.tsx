import React, { useRef, useEffect, useCallback } from "react";
import GameData from "../../../entities/GameData";
import { createPieChart, getSelectionMap } from "../../../chart/PieChart";
import { DataPair } from "../../../chart/DataPair";
import { PieChartController } from "../../../chart/PieChartController";
import { drawPieChart } from "../../../chart/pieChartDrawing";

interface GameChartProps {
    size: number,
    gameData: GameData;
    controllerRef: React.MutableRefObject<PieChartController>;
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

        const controller: PieChartController = {
            selectionMap: getSelectionMap(canvasRef.current, pieChart),
            restorePieChart: () => { 
                drawPieChart(canvasRef.current, pieChart); 
            }
        }
        props.controllerRef.current = controller;

        drawPieChart(canvasRef.current, pieChart);
    });

    return (
        <span style={{ marginTop: "auto", marginBottom: "auto" }}>
            <canvas ref={createChart}
                    width={props.size}
                    height={props.size} />
        </span>
    );
}