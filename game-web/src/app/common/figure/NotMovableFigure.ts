import { IMovable } from './IMovableFigure';
import { ICellLocation } from '../location/ICellLocation.interface';
import { NullLocation } from '../location/nullLocation';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';
import { LandResult } from '../classes/LandResult';

export class NotMovableFigure implements IMovable {
    private static _instance: IMovable;

    private constructor() { }

    static get Instance() {
        return this._instance || (this._instance = new this());
    }

    move(toLocation: ICellLocation): ICellLocation {
        return NullLocation.Instance;
    }

    land(pathDistance: IDirectionDescriptor, targetLocation: ICellLocation): LandResult {
        return null;
    }
}