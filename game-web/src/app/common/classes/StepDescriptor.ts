import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';
import { ICellLocation } from '../location/ICellLocation.interface';

export class StepDescriptor {
  from: ICellLocation;
  canChangeDirection: boolean;
  currentDirection: IDirectionDescriptor;

  constructor(
    from: ICellLocation,
    canChangeDirection: boolean,
    currentDirection: IDirectionDescriptor
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

  public takeAStep(): ICellLocation {
    throw new Error('Method not implemented');
  }
}
