import { IFigure } from '../interfaces/IFigure.interface';
import { Color } from '../enums/color.enum';
import { FigureType } from '../enums/figureTypes.enum';
import { LandResult } from '../classes/LanDresult';
import { DirectionDescriptor } from '../classes/DirectionDescriptor';
import { CellLocation } from '../classes/Location';

export class ActiveFrog implements IFigure {
  type: FigureType;
  color: Color;


  constructor(color: Color){
    this.type = FigureType.ACTIVEFROG;
    this.color = color;
  }

  land(distance: DirectionDescriptor, location: CellLocation): LandResult {
    return this.canLand(distance) ? new LandResult(location, false) : null;
  }

  private canLand(distance: DirectionDescriptor): boolean {
    return distance.isOneStepAway();
  }
}
