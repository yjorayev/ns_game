import { DirectionDescriptor } from './DirectionDescriptor';

export class CellLocation {
    row: number;
    column: number;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    public shift(direction: DirectionDescriptor): CellLocation {
        return new CellLocation(this.row + direction.rowPush, this.column + direction.columnPush);
    }

    public equals(location: CellLocation): boolean {
      return this.row === location.row && this.column === location.column;
    }

    public distanceTo(step: CellLocation): DirectionDescriptor {
      const rowDistance = this.row - step.row;
      const columnDistance = this.column - step.column;
      return new DirectionDescriptor(rowDistance, columnDistance);
    }
  }
