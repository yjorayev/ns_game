import { Frog } from './FrogFigure';
import { StepDescriptor } from '../classes/StepDescriptor';
import { BoardState } from '../classes/BoardState';

export class InactiveFrog extends Frog {
  land(step: StepDescriptor, boardState: BoardState): StepDescriptor {
    return null;
  }
}
