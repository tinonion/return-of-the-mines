class Extents {
    left: number;
    top: number;
    width: number;
    height: number;

    constructor(left: number, top: number, width: number, height: number) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }

    get right() {
        return this.left + this.width;
    }

    get bottom() {
        return this.top + this.height;
    }

    isInside(x: number, y: number) {
        return x > this.left &&
               x < this.right &&
               y > this.top &&
               y < this.bottom;
    }

    createPadded(padding: number) {
        return new Extents(
            this.left - padding,
            this.top - padding,
            this.width + (2 * padding),
            this.height + (2 * padding)
        )
    }

    static inMatrix(matrix: Array<Array<any>>, col: number, row: number) {
        // assumes row, col index order
        const width = matrix[0].length;
        const height = matrix.length;

        return col >= 0 &&
            row >= 0 &&
            col < width &&
            row < height;
    }
}

export default Extents;