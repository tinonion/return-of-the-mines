export interface PieChartController {
    selectionMap: Map<string, () => void> | null;
    restorePieChart: () => void | null;
}

export function createChartController() {
    return {
        selectionMap: null,
        restorePieChart: null
    } as PieChartController;
}

export function populateChartController(controller: PieChartController, selectionMap: Map<string, () => void>, restoreFun: () => void) {
    controller.selectionMap = selectionMap;
    controller.restorePieChart = restoreFun;
}

export function isPopulated(controller: PieChartController) {
    return controller.selectionMap != null && controller.restorePieChart != null;
}