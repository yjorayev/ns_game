import { NullLocation } from '../location/nullLocation';
import { ICellLocation } from '../location/ICellLocation.interface';

export class Path {
    from: ICellLocation;
    to: ICellLocation;
    midPoint?: ICellLocation;
    constructor(from: ICellLocation, to: ICellLocation, midPoint: ICellLocation = NullLocation.Instance) {
        this.from = from;
        this.to = to;
        this.midPoint = midPoint;
    }

    contains(point: ICellLocation): boolean {
        if (this.midPoint === NullLocation.Instance) {
            return this.isInRange(this.from, this.to, point)
                || this.isInRange(this.to, this.from, point);
        } else {
            return this.isInRange(this.from, this.midPoint, point)
                || this.isInRange(this.midPoint, this.from, point)
                || this.isInRange(this.midPoint, this.to, point)
                || this.isInRange(this.to, this.midPoint, point);
        }
    }

    private isInRange(from: ICellLocation, to: ICellLocation, point: ICellLocation): boolean {
        return from.row <= point.row
            && from.column <= point.column
            && point.row <= to.row
            && point.column <= to.column;
    }
}
