import { DirectionDescriptor } from '../directionDescriptor/directionDescriptor';
import { ICellLocation } from './ICellLocation.interface';
import { IDirectionDescriptor } from '../directionDescriptor/IDirectionDescriptor.interface';

export class CellLocation implements ICellLocation {
  row: number;
  column: number;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }

  public shift(direction: IDirectionDescriptor): ICellLocation {
    return new CellLocation(this.row + direction.rowPush, this.column + direction.columnPush);
  }

  public equals(location: ICellLocation): boolean {
    return this.row === location.row && this.column === location.column;
  }

  public distanceTo(step: ICellLocation): IDirectionDescriptor {
    const rowDistance = this.row - step.row;
    const columnDistance = this.column - step.column;
    return new DirectionDescriptor(rowDistance, columnDistance);
  }
}