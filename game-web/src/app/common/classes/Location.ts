import { DirectionDescriptor } from './DirectionDescriptor';

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

    public equals(location: Location): boolean {
      return this.row === location.row && this.column === location.column;
    }

    public distanceTo(step: Location): DirectionDescriptor {
      const rowDistance = this.row - step.row;
      const columnDistance = this.column - step.column;
      return new DirectionDescriptor(rowDistance, columnDistance);
    }
  }
