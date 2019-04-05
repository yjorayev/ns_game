export class StepDescriptor {
  rowPush: number;
  columnPush: number;

  constructor(row: number, column: number) {
    this.rowPush = row;
    this.columnPush = column;
  }
}
