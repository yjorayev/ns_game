import { IFigure } from 'src/app/common/interfaces/IFigure.interface';
import { FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { DirectionDescriptor } from '../classes/DirectionDescriptor';
import { CellLocation } from '../classes/Location';
import { LandResult } from '../classes/LanDresult';

export class NullFigure implements IFigure {
  type: FigureType;
  color: Color;

  constructor() {
    this.type = FigureType.NULL;
    this.color = Color.NULL;
  }

  land(pathDistance: DirectionDescriptor, targetLocation: CellLocation): LandResult {
    return new LandResult(targetLocation, true);
  }
}
