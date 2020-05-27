import { DataPair, getDataSum } from "./DataPair";

// where first line in pie chart is
const START_ANGLE = Math.PI * 1.5; 

const CHART_COLORS = ["blue", "red", "orange", "green", "black", "yellow"];

export interface Piece {
    startAngle: number,
    endAngle: number,
    dataPair: DataPair,
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

    for (let pair of dataPairs) {
        const fraction = pair[1] / dataSum;
        const nextAngle = lastAngle + (fraction * Math.PI * 2);

        pieces.push({ startAngle: lastAngle, endAngle: nextAngle, dataPair: pair })
        lastAngle = nextAngle;
    }

    const centerX = size / 2;
    const centerY = centerX;
    const radius = size * 0.45;

    return { centerX, centerY, radius, pieces };
}

function getArcPoint(startX: number, startY: number, r: number, theta: number) {
    return [((r * Math.cos(theta)) + startX), ((r * Math.sin(theta)) + startY)];
}

export function drawPieChart(canvas: HTMLCanvasElement, pieChart: PieChart) {
    const [centerX, centerY, radius] = [pieChart.centerX, pieChart.centerY, pieChart.radius];
    const pieces = pieChart.pieces;

    console.assert(pieces.length != 3, "game data pie chart should be 3 pieces");

    const ctx = canvas.getContext("2d");

    // draw pie sections
    for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const [startAngle, endAngle] = [piece.startAngle, piece.endAngle, piece.dataPair];

        let [arcX1, arcY1] = getArcPoint(centerX, centerY, radius, startAngle);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(arcX1, arcY1);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();

        ctx.fillStyle = CHART_COLORS[i];
        ctx.fill();
    }    
}