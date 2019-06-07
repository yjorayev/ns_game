import { IFigure } from 'src/app/common/interfaces/IFigure.interface';
import { FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { LandResult } from '../classes/LanDresult';
import { DirectionDescriptor } from '../classes/DirectionDescriptor';
import { CellLocation } from '../classes/Location';

export class Obstacle implements IFigure {
  type: FigureType;
  color: Color;

  constructor(color: Color) {
    this.type = FigureType.OBSTACLE;
    this.color = color;
  }

  land(pathDistance: DirectionDescriptor, targetLocation: CellLocation): LandResult {
    return null;
  }
}
