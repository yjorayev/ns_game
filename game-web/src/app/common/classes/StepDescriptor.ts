export class StepDescriptor {
  rowPush: number;
  columnPush: number;

  constructor(row: number, column: number) {
    this.rowPush = row;
    this.columnPush = column;
  }

  equals(item: StepDescriptor): boolean{
    return this.rowPush === item.rowPush && this.columnPush === item.columnPush;
  }
}
