import { DirectionDescriptor } from './StepDescriptor';

export class Location {
    row: number;
    column: number;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    public shift(direction: DirectionDescriptor): Location {
        return new Location(this.row + direction.rowPush, this.column + direction.columnPush);
    }
  }
