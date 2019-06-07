import { IFigure } from '../interfaces/IFigure.interface';
import { Color } from '../enums/color.enum';
import { FigureType } from '../enums/figureTypes.enum';
import { CellLocation } from '../classes/Location';
import { LandResult } from '../classes/LanDresult';
import { DirectionDescriptor } from '../classes/DirectionDescriptor';

export class InactiveFrog implements IFigure {
  type: FigureType;
  color: Color;

  constructor(color: Color){
    this.type = FigureType.INACTIVEFROG;
    this.color = color;
  }

  land(pathDistance: DirectionDescriptor, targetLocation: CellLocation): LandResult {
    return null;
  }
}
