import { IFigure } from 'src/app/common/figure/IFigure.interface';
import { FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { LandResult } from '../classes/LanDresult';
import { DirectionDescriptor } from '../directionDescriptor/DirectionDescriptor';
import { ICellLocation } from '../location/ICellLocation.interface';
import { NullLocation } from '../location/nullLocation';

export class Obstacle implements IFigure {
  type: FigureType;
  color: Color;
  currentLocation: ICellLocation;

  constructor(color: Color, loc: ICellLocation) {
    this.type = FigureType.OBSTACLE;
    this.color = color;
    this.currentLocation = loc;
  }

  getLandResult(pathDistance: DirectionDescriptor, targetLocation: ICellLocation): LandResult {
    return null;
  }
}
