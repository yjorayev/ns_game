import { DirectionDescriptor } from './DirectionDescriptor';
import { CellLocation } from './Location';

export class StepDescriptor {
  from: CellLocation;
  canChangeDirection: boolean;
  currentDirection: DirectionDescriptor;

  constructor(
    from: CellLocation,
    canChangeDirection: boolean,
    currentDirection: DirectionDescriptor
  ) {
    this.from = from;
    this.canChangeDirection = canChangeDirection;
    this.currentDirection = currentDirection;
  }

  public equals(step: StepDescriptor): boolean {
    return this.from.equals(step.from)
      && this.currentDirection.equals(step.currentDirection)
      && this.canChangeDirection === step.canChangeDirection;
  }

  public takeAStep(): CellLocation {
    throw new Error('Method not implemented');
  }
}
