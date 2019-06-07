import { FigureType as FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { LandResult } from '../classes/LandResult';
import { DirectionDescriptor } from '../classes/DirectionDescriptor';
import { CellLocation } from '../classes/Location';

export interface IFigure {
  type: FigureType;
  color: Color;

  land(pathDistance: DirectionDescriptor, targetLocation: CellLocation): LandResult;
}
