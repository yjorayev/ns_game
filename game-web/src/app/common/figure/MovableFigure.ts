import { IMovable } from './IMovableFigure';
import { ICellLocation } from '../location/ICellLocation.interface';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';
import { LandResult } from '../classes/LandResult';

export class MovableFigure implements IMovable {
    private static _instance: IMovable;

    private constructor(){}

    static get Instance() {
        return this._instance || (this._instance = new this());
    }

    move(toLocation: ICellLocation): ICellLocation {
        return toLocation;
    }

    land(distance: IDirectionDescriptor, location: ICellLocation): LandResult {
        if (this.canLand(distance)) {
            return new LandResult(location, false);
        }
        else
            return null;
    }

    private canLand(distance: IDirectionDescriptor): boolean {
        return distance.isOneStepAway();
    }
}