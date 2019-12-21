export class DirectionDescriptor {
  rowPush: number;
  columnPush: number;

  constructor(row: number, column: number) {
    this.rowPush = row;
    this.columnPush = column;
  }

  equals(item: DirectionDescriptor): boolean {
    return this.rowPush === item.rowPush && this.columnPush === item.columnPush;
  }

  isOneStepAway(): boolean {
    return (this.rowPush === 0 && Math.abs(this.columnPush) === 1)
      || (this.rowPush === 1 && Math.abs(this.columnPush) === 0);
  }
}
