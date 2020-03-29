import { IFigure } from 'src/app/common/figure/IFigure.interface';
import { FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { LandResult } from '../classes/LanDresult';
import { DirectionDescriptor } from '../directionDescriptor/directionDescriptor';
import { ICellLocation } from '../location/ICellLocation.interface';

export class Obstacle implements IFigure {
  type: FigureType;
  color: Color;

  constructor(color: Color) {
    this.type = FigureType.OBSTACLE;
    this.color = color;
  }

  getLandResult(pathDistance: DirectionDescriptor, targetLocation: ICellLocation): LandResult {
    return null;
  }
}
