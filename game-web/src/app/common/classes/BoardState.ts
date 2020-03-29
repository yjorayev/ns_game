import { IFigure } from '../figure/IFigure.interface';
import { LandResult } from './LandResult';
import { ICellLocation } from '../location/ICellLocation.interface';

export class BoardState {
  public rows: number;
  public columns: number;
  public values: IFigure[][];

  constructor(rows: number, columns: number, values?: IFigure[][]) {
    this.rows = rows;
    this.columns = columns;
  }

  setFigure(location: ICellLocation, figure: IFigure): void {
    this.values[location.row][location.column] = figure;
  }

  getLandResult(toLocation: ICellLocation, fromLocation: ICellLocation): LandResult {
    let landResult: LandResult;

    if (this.isLocationValid(toLocation)) {
      const figure = this.getFigure(toLocation);
      const pathDistance = fromLocation.distanceTo(toLocation);

      landResult = figure.getLandResult(pathDistance, toLocation);
      if (landResult && !landResult.exitLocation.equals(toLocation)) {
        landResult = this.getLandResult(landResult.exitLocation, fromLocation);
      }
    }

    return landResult;
  }

  private getFigure(location: ICellLocation): IFigure {
    return this.values[location.row][location.column];
  }

  private isLocationValid(location: ICellLocation): boolean {
    return location && location.row >= 0 && location.row < this.rows &&
      location.column >= 0 && location.column < this.columns;
  }
}
