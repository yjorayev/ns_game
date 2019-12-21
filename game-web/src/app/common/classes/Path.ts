import { CellLocation } from './Location';

export class Path {
    from: CellLocation;
    to: CellLocation;
    midPoint?: CellLocation;
    constructor(from: CellLocation, to: CellLocation, midPoint?: CellLocation) {
        this.from = from;
        this.to = to;
        this.midPoint = midPoint;
    }

    contains(point: CellLocation): boolean {
        if (this.midPoint) {
            return this.isInRange(this.from, this.midPoint, point)
                || this.isInRange(this.midPoint, this.from, point)
                || this.isInRange(this.midPoint, this.to, point)
                || this.isInRange(this.to, this.midPoint, point);
        } else {
            return this.isInRange(this.from, this.to, point)
            || this.isInRange(this.to, this.from, point);
        }
    }

    private isInRange(from: CellLocation, to: CellLocation, point: CellLocation): boolean {
        return from.row <= point.row
            && from.column <= point.column
            && point.row <= to.row
            && point.column <= to.column;
    }
}
