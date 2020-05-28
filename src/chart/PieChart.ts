import { DataPair, getDataSum } from "./DataPair";
import { drawPieceSelection } from "./pieChartDrawing";

// where first line in pie chart is
const START_ANGLE = Math.PI * 1.5; 

const CHART_COLORS = ["blue", "red", "orange", "green", "black", "yellow"];

export interface Piece {
    startAngle: number,
    endAngle: number,
    name: string,
    color: string
}

export interface PieChart {
    centerX: number,
    centerY: number,
    radius: number,
    pieces: Array<Piece>
}

export function createPieChart(size: number, dataPairs: Array<DataPair>): PieChart {
    const dataSum = getDataSum(dataPairs);

    let lastAngle = START_ANGLE;
    let pieces = new Array<Piece>();

    for (let i = 0; i < dataPairs.length; i++) {
        const pair = dataPairs[i];
        const fraction = pair[1] / dataSum;
        const nextAngle = lastAngle + (fraction * Math.PI * 2);

        pieces.push({ startAngle: lastAngle, endAngle: nextAngle, name: pair[0], color: CHART_COLORS[i] })
        lastAngle = nextAngle;
    }

    const centerX = size / 2;
    const centerY = centerX;
    const radius = size * 0.42; // make smaller than given size, so it has room to expand

    return { centerX, centerY, radius, pieces };
}

export function getSelectionMap(canvas: HTMLCanvasElement, pieChart: PieChart) {
    let selectionMap = new Map<string, () => void>();

    for (let piece of pieChart.pieces) {
        const selectFun = () => {
            drawPieceSelection(canvas, pieChart, piece);
        }

        selectionMap.set(piece.name, selectFun);
    }

    return selectionMap;
}