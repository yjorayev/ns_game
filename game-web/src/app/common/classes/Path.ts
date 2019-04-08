import { Location } from './Location';

export class Path {
    from: Location;
    to: Location;
    midPoint?: Location;
    constructor(from: Location, to: Location, midPoint?: Location) {
        this.from = from;
        this.to = to;
        this.midPoint = midPoint;
    }
}