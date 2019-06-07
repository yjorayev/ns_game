import { CellLocation } from '../src/app/common/classes/Location';
import { IFigure } from 'src/app/common/interfaces/IFigure.interface';


export class BoardStateOld {
  private rows: number;
  private columns: number;

  private values: IFigure[][];
  public isComplete: boolean;

  public getFigure(location: CellLocation): IFigure {
    return this.values[location.row][location.column];
  }

  public setFigure(location: CellLocation, figure: IFigure): void {
    this.values[location.row][location.column] = figure;
  }

  public isLocationOnBoard(location: CellLocation): boolean {
    throw new Error('Method not implemented.');
  }
}
