import { Location } from '../src/app/common/classes/Location';
import { IFigure } from 'src/app/common/interfaces/IFigure.interface';


export class BoardState {
  private rows: number;
  private columns: number;

  private values: IFigure[][];
  public isComplete: boolean;

  public getFigure(location: Location): IFigure {
    return this.values[location.row][location.column];
  }

  public setFigure(location: Location, figure: IFigure): void {
    this.values[location.row][location.column] = figure;
  }

  public isLocationOnBoard(location: Location): boolean {
    throw new Error('Method not implemented.');
  }
}
