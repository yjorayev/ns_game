import { IFigure } from './IFigure.interface';
import { Color } from '../enums/color.enum';
import { FigureType } from '../enums/figureTypes.enum';
import { LandResult } from '../classes/LanDresult';
import { ICellLocation } from '../location/ICellLocation.interface';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';

export class ActiveFrog implements IFigure {
  type: FigureType;
  color: Color;


  constructor(color: Color){
    this.type = FigureType.ACTIVEFROG;
    this.color = color;
  }

  getLandResult(distance: IDirectionDescriptor, location: ICellLocation): LandResult {
    return this.canLand(distance) ? new LandResult(location, false) : null;
  }

  private canLand(distance: IDirectionDescriptor): boolean {
    return distance.isOneStepAway();
  }
}
