import { IFigure } from 'src/app/common/figure/IFigure.interface';
import { FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { LandResult } from '../classes/LanDresult';
import { DirectionDescriptor } from '../directionDescriptor/DirectionDescriptor';
import { ICellLocation } from '../location/ICellLocation.interface';
import { MessengerService } from '../messenger.service';

export class Obstacle implements IFigure {
  type: FigureType;
  color: Color;
  currentLocation: ICellLocation;
  text: string;

  constructor(color: Color, loc: ICellLocation) {
    this.type = FigureType.OBSTACLE;
    this.color = color;
    this.currentLocation = loc;
    this.text = 'X';
  }

  getLandResult(pathDistance: DirectionDescriptor, targetLocation: ICellLocation): LandResult {
    return null;
  }

  activate(messenger: MessengerService) { }

  moveOn(messenger: MessengerService, targetFigure: IFigure) {
    throw Error('Cannot move on obstacle.');
  }
}
