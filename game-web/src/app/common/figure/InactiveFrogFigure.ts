import { IFigure } from './IFigure.interface';
import { Color } from '../enums/color.enum';
import { FigureType } from '../enums/figureTypes.enum';
import { LandResult } from '../classes/LanDresult';
import { ICellLocation } from '../location/ICellLocation.interface';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';

export class InactiveFrog implements IFigure {
  type: FigureType;
  color: Color;

  constructor(color: Color){
    this.type = FigureType.INACTIVEFROG;
    this.color = color;
  }

  getLandResult(pathDistance: IDirectionDescriptor, targetLocation: ICellLocation): LandResult {
    return null;
  }
}
