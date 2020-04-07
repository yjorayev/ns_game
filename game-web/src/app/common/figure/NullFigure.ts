import { IFigure } from 'src/app/common/figure/IFigure.interface';
import { FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { LandResult } from '../classes/LandResult';
import { ICellLocation } from '../location/ICellLocation.interface';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';
import { MessengerService } from '../messenger.service';

export class NullFigure implements IFigure {
  type: FigureType;
  color: Color;
  currentLocation: ICellLocation;
  text: string;

  constructor(loc: ICellLocation) {
    this.type = FigureType.NULL;
    this.color = Color.NULL;
    this.currentLocation = loc;
    this.text = '';
  }

  getLandResult(pathDistance: IDirectionDescriptor, targetLocation: ICellLocation): LandResult {
    return new LandResult(targetLocation, true);
  }

  activate(messenger: MessengerService) { }

  moveOn(messenger: MessengerService, targetFigure: IFigure) { }
}
