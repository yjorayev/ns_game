import { IDirectionDescriptor } from './IDirectionDescriptor.interface';

export class DirectionDescriptor implements IDirectionDescriptor {
  rowPush: number;
  columnPush: number;

  constructor(row: number, column: number) {
    this.rowPush = row;
    this.columnPush = column;
  }

  equals(item: IDirectionDescriptor): boolean {
    return this.rowPush === item.rowPush && this.columnPush === item.columnPush;
  }

  isOneStepAway(): boolean {
    return (this.rowPush === 0 && Math.abs(this.columnPush) === 1)
      || (this.rowPush === 1 && Math.abs(this.columnPush) === 0);
  }

  isReverseOf(item: IDirectionDescriptor): boolean {
    return this.rowPush + item.rowPush === 0 && this.columnPush + item.columnPush === 0;
  }

  updateDirection(direction: IDirectionDescriptor): IDirectionDescriptor {
    return this;
   }
}
