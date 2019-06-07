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
}
