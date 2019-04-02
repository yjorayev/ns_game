import { StepDescriptor } from "./BoardStateTransitionManager";

export class Location {
    row: number;
    column: number;

    constructor(_row: number, _column: number){
        this.row = _row;
        this.column = _column;
    }

    public shift(step: StepDescriptor): Location{
        return new Location(this.row + step.rowPush, this.column + step.columnPush);
    }
  }