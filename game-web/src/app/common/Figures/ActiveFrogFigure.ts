import { Frog } from './FrogFigure';
import { StepDescriptor } from '../classes/StepDescriptor';
import { BoardState } from '../classes/BoardState';
import { InactiveFrog } from './InactiveFrogFigure';

export class ActiveFrog extends Frog {

  land(step: StepDescriptor, boardState: BoardState): StepDescriptor {
    const direction = step.from.distanceTo(step.to);
    return direction.isValid() ? this.swap(step, boardState) : null;
  }

  private swap(step: StepDescriptor, boardState: BoardState): StepDescriptor {
    const fromFigure = boardState.getFigure(step.from);
    if (!(fromFigure instanceof ActiveFrog)) {
      throw new Error('Moving a non-frog figure is not allowed!');
    }

    const fromColor = fromFigure.color;
    boardState.setFigure(step.from, new InactiveFrog(this.color));
    boardState.setFigure(step.to, new ActiveFrog(fromColor));

    return step;
  }
}
