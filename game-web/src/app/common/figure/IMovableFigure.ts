import { ICellLocation } from '../location/ICellLocation.interface';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';
import { LandResult } from '../classes/LandResult';
import { MessengerService } from '../messenger.service';
import { IFigure } from './IFigure.interface';

export interface IMovable {
    text: string;
    move(toLocation: ICellLocation): ICellLocation;
    land(pathDistance: IDirectionDescriptor, targetLocation: ICellLocation): LandResult;
    activate(messenger: MessengerService, figure: IFigure): void;
}