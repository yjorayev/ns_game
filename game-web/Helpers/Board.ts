import { IFigure } from 'src/app/common/figure/IFigure.interface';
import { ICellLocation } from 'src/app/common/location/ICellLocation.interface';


export class BoardStateOld {
  private rows: number;
  private columns: number;

  private values: IFigure[][];
  public isComplete: boolean;

  public getFigure(location: ICellLocation): IFigure {
    return this.values[location.row][location.column];
  }

  public setFigure(location: ICellLocation, figure: IFigure): void {
    this.values[location.row][location.column] = figure;
  }

  public isLocationOnBoard(location: ICellLocation): boolean {
    throw new Error('Method not implemented.');
  }
}
