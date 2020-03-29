import { IFigure } from 'src/app/common/figure/IFigure.interface';
import { FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { LandResult } from '../classes/LanDresult';
import { ICellLocation } from '../location/ICellLocation.interface';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';

export class NullFigure implements IFigure {
  type: FigureType;
  color: Color;

  constructor() {
    this.type = FigureType.NULL;
    this.color = Color.NULL;
  }

  getLandResult(pathDistance: IDirectionDescriptor, targetLocation: ICellLocation): LandResult {
    return new LandResult(targetLocation, true);
  }
}
