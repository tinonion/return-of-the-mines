export type DataPair = [string, number];

export function getDataSum(dataPairs: Array<DataPair>) {
    let dataSum = 0;

    for (let pair of dataPairs) {
        dataSum += pair[1];
    }

    return dataSum;
}