import { PieChart, Piece } from "./PieChart";

export function getArcPoint(startX: number, startY: number, r: number, theta: number) {
    return [((r * Math.cos(theta)) + startX), ((r * Math.sin(theta)) + startY)];
}

export function drawPieSlice(canvas: HTMLCanvasElement, x: number, y: number, r: number, startAngle: number, endAngle: number, color: string) {
    const ctx = canvas.getContext("2d");

    let [arcX1, arcY1] = getArcPoint(x, y, r, startAngle);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(arcX1, arcY1);
    ctx.arc(x, y, r, startAngle, endAngle);
    ctx.lineTo(x, y);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();
}

export function drawPieChart(canvas: HTMLCanvasElement, pieChart: PieChart) {
    const [centerX, centerY, radius] = [pieChart.centerX, pieChart.centerY, pieChart.radius];
    const pieces = pieChart.pieces;

    const ctx = canvas.getContext("2d");

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw pie sections
    for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        drawPieSlice(canvas, centerX, centerY, radius, piece.startAngle, piece.endAngle, piece.color);
    }    
}

export function drawPieceSelection(canvas: HTMLCanvasElement, pieChart: PieChart, piece: Piece) {
    const [x, y, r] = [pieChart.centerX, pieChart.centerY, pieChart.radius];
    const [startAngle, endAngle, c] = [piece.startAngle, piece.endAngle, piece.color];

    // change radius to be half of canvas width from .42 of canvas width
    const expandedRadius = r * (0.5 / 0.42);
    drawPieSlice(canvas, x, y, expandedRadius, startAngle, endAngle, c);
}
