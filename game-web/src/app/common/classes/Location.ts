import { StepDescriptor } from './StepDescriptor';

export class Location {
    row: number;
    column: number;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    public shift(step: StepDescriptor): Location {
        return new Location(this.row + step.rowPush, this.column + step.columnPush);
    }
  }
