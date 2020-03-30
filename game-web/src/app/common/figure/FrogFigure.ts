import { IFigure } from './IFigure.interface';
import { Color } from '../enums/color.enum';
import { FigureType } from '../enums/figureTypes.enum';
import { LandResult } from '../classes/LanDresult';
import { ICellLocation } from '../location/ICellLocation.interface';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';
import { IMovable } from './IMovableFigure';
import { MovableFigure } from './MovableFigure';

export class Frog implements IFigure {
  private _movable: IMovable;
  type: FigureType;
  color: Color;
  currentLocation: ICellLocation;

  constructor(color: Color, loc: ICellLocation) {
    this.type = FigureType.FROG;
    this.color = color;
    this.currentLocation = loc;
    this._movable = MovableFigure.Instance;
  }

  getLandResult(distance: IDirectionDescriptor, location: ICellLocation): LandResult {
    return this._movable.land(distance, location);
  }

  activate(): ICellLocation {
    return this.currentLocation;
  }
}
