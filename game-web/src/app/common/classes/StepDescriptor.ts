import { DirectionDescriptor } from './DirectionDescriptor';
import { Location } from './Location';

export class StepDescriptor {
  from: Location;
  to: Location;
  canChangeDirection: boolean;
  currentDirection: DirectionDescriptor;

  constructor(
    from: Location,
    to: Location,
    canChangeDirection: boolean,
    currentDirection: DirectionDescriptor
  ) {
    this.from = from;
    this.to = to;
    this.canChangeDirection = canChangeDirection;
    this.currentDirection = currentDirection;
  }

  public equals(step: StepDescriptor): boolean {
    return this.from.equals(step.from)
      && this.to.equals(step.to)
      && this.currentDirection.equals(step.currentDirection)
      && this.canChangeDirection === step.canChangeDirection;
  }
}


// location is final location after move is completed(jumps, direction changes)
