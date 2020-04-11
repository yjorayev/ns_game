import { IFigure } from './IFigure.interface';
import { Color } from '../enums/color.enum';
import { FigureType } from '../enums/figureTypes.enum';
import { ICellLocation } from '../location/ICellLocation.interface';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';
import { IMovable } from './IMovableFigure';
import { MovableFigure } from './MovableFigure';
import { MessengerService } from '../messenger.service';
import { NotMovableFigure } from './NotMovableFigure';
import { LandResult } from '../classes/LandResult';

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

  get text() {
    return this._movable.text;
  }

  getLandResult(distance: IDirectionDescriptor, location: ICellLocation): LandResult {
    return this._movable.land(distance, location);
  }

  activate(messenger: MessengerService) {
    this._movable.activate(messenger, this);
  }

  moveOn(messenger: MessengerService, targetFigure: IFigure) {
    this.validateMovable();

    this._movable = NotMovableFigure.Instance;
    this.swapPositionWith(messenger, targetFigure);
  }

  private swapPositionWith(messenger: MessengerService, figure: IFigure): void {
    const currentLocation = this.currentLocation;
    this.currentLocation = figure.currentLocation;
    figure.currentLocation = currentLocation;
    messenger.figuresSwapped(this, figure);
  }

  private validateMovable() {
    if (this._movable === NotMovableFigure.Instance) {
      throw Error('cannot call this method on non-movable state');
    }
  }

}
