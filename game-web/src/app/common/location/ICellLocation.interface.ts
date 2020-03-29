import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';

export interface ICellLocation{
    row: number;
    column: number;
    shift(direction: IDirectionDescriptor): ICellLocation;
    equals(location: ICellLocation): boolean;
    distanceTo(step: ICellLocation): IDirectionDescriptor;
}