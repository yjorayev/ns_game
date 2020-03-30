import { ICellLocation } from '../location/ICellLocation.interface';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';
import { LandResult } from '../classes/LandResult';

export interface IMovable {
    move(toLocation: ICellLocation): ICellLocation;

    land(pathDistance: IDirectionDescriptor, targetLocation: ICellLocation): LandResult;
}