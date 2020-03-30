import { IFigure } from 'src/app/common/figure/IFigure.interface';
import { FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { LandResult } from '../classes/LandResult';
import { ICellLocation } from '../location/ICellLocation.interface';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';
import { NullLocation } from '../location/nullLocation';

export class NullFigure implements IFigure {
  type: FigureType;
  color: Color;
  currentLocation: ICellLocation;

  constructor(loc: ICellLocation) {
    this.type = FigureType.NULL;
    this.color = Color.NULL;
    this.currentLocation = loc;
  }

  getLandResult(pathDistance: IDirectionDescriptor, targetLocation: ICellLocation): LandResult {
    return new LandResult(targetLocation, true);
  }
}
