export interface PieChartController {
    selectionMap: Map<string, () => void>;
    restorePieChart: () => void;
}