import { Location } from '../classes/Location';
import { IFigure } from 'src/app/common/interfaces/IFigure.interface';
import { FigureType } from '../enums/figureTypes.enum';
import { Color } from '../enums/color.enum';
import { BoardState } from '../classes/BoardState';
import { StepDescriptor } from '../classes/StepDescriptor';
import { ActiveFrog } from './ActiveFrogFigure';

export class NullFigure implements IFigure {
  type: FigureType;
  color: Color;

  constructor() {
    this.type = FigureType.NULL;
    this.color = Color.NULL;
  }

  land(step: StepDescriptor, boardState: BoardState): StepDescriptor {
    const figure = boardState.getFigure(step.from);
    if (!(figure instanceof ActiveFrog)) {
      throw new Error('Moving a non-frog figure is not allowed!');
    }

    boardState.setFigure(step.from, new NullFigure());
    boardState.setFigure(step.to, figure);

    return step;
  }
}
