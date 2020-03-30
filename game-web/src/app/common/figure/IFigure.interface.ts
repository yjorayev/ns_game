import { FigureType as FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { LandResult } from '../classes/LandResult';
import { ICellLocation } from '../location/ICellLocation.interface';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';
import { IMovable } from './IMovableFigure';

export interface IFigure {
  type: FigureType;
  color: Color;
  currentLocation: ICellLocation;

  getLandResult(pathDistance: IDirectionDescriptor, targetLocation: ICellLocation): LandResult;
}
