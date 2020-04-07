import { IMovable } from './IMovableFigure';
import { ICellLocation } from '../location/ICellLocation.interface';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';
import { LandResult } from '../classes/LandResult';
import { MessengerService } from '../messenger.service';
import { IFigure } from './IFigure.interface';

export class MovableFigure implements IMovable {
    private static _instance: IMovable;

    private constructor() { }

    text = 'AF';

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

    activate(messenger: MessengerService, figure: IFigure) {
        messenger.figureActivated(figure);
    }

    private canLand(distance: IDirectionDescriptor): boolean {
        return distance.isOneStepAway();
    }
}