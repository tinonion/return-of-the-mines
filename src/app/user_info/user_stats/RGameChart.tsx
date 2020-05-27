import React, { useRef, useEffect, useCallback } from "react";
import GameData from "../../../entities/GameData";
import { createPieChart, drawPieChart } from "../../../chart/PieChart";
import { DataPair } from "../../../chart/DataPair";

interface GameChartProps {
    size: number,
    gameData: GameData;
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

        const gamesPieChart = createPieChart(props.size, dataPairs);

        drawPieChart(canvasRef.current, gamesPieChart);
    });

    return (
        <span style={{ marginTop: "auto", marginBottom: "auto" }}>
            <canvas ref={createChart}
                    width={props.size}
                    height={props.size} />
        </span>
    );
}