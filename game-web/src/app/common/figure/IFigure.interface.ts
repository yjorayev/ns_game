import { FigureType as FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { LandResult } from '../classes/LandResult';
import { ICellLocation } from '../location/ICellLocation.interface';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';

export interface IFigure {
  type: FigureType;
  color: Color;

  getLandResult(pathDistance: IDirectionDescriptor, targetLocation: ICellLocation): LandResult;
}
