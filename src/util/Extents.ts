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
        return x >= this.left &&
               x <= this.right &&
               y >= this.top &&
               y <= this.bottom;
    }

    createPadded(padding: number) {
        return new Extents(
            this.left - padding,
            this.top - padding,
            this.width + (2 * padding),
            this.height + (2 * padding)
        )
    }
}

export default Extents;