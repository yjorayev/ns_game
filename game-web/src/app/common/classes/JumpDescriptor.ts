import { DirectionDescriptor } from './StepDescriptor';
import { Location } from './Location';

export class StepDescriptor {
  location: Location;
  canChangeDirection: boolean;
  currentDirection: DirectionDescriptor;

  constructor(
    location: Location,
    canChangeDirection: boolean,
    currentDirection: DirectionDescriptor
  ) {
    this.location = location;
    this.canChangeDirection = canChangeDirection;
    this.currentDirection = currentDirection;
  }

  public equals(step: StepDescriptor): boolean {
    return this.location.equals(step.location)
      && this.currentDirection.equals(step.currentDirection)
      && this.canChangeDirection === step.canChangeDirection;
  }
}
