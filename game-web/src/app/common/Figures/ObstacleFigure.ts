import { Location } from '../classes/Location';
import { IFigure } from 'src/app/common/interfaces/IFigure.interface';
import { FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { BoardState } from '../classes/BoardState';
import { StepDescriptor } from '../classes/StepDescriptor';

export class Obstacle implements IFigure {
  type: FigureType;
  color: Color;

  constructor(color: Color) {
    this.type = FigureType.OBSTACLE;
    this.color = color;
  }

  land(step: StepDescriptor, boardState: BoardState): StepDescriptor {
    return null;
  }
}
