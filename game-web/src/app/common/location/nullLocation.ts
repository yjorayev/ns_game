import { ICellLocation } from './ICellLocation.interface';
import { DirectionDescriptor } from '../directionDescriptor/directionDescriptor';

export class NullLocation implements ICellLocation {
    private static _instance: NullLocation;
    row = Number.NaN;
    column = Number.NaN;

    private constructor() { };

    static get Instance() {
        return this._instance || (this._instance = new this());
    }

    shift(direction: DirectionDescriptor): ICellLocation {
        return this;
    }

    equals(location: ICellLocation): boolean {
        return location === NullLocation.Instance
    }

    distanceTo(step: ICellLocation): DirectionDescriptor {
        return new DirectionDescriptor(Number.NaN, Number.NaN);
    }
}