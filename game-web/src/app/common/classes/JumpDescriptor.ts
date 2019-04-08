import { StepDescriptor } from './StepDescriptor';
import { Location } from './Location';

export class JumpDescriptor {
    location: Location;
    canChangeDirection: boolean;
    currentDirection: StepDescriptor;

    constructor(location: Location, canChangeDirection: boolean, currentDirection: StepDescriptor){
        this.location = location;
        this.canChangeDirection = canChangeDirection;
        this.currentDirection = currentDirection;
    }
}