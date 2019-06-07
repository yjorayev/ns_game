import { IFigure } from '../interfaces/IFigure.interface';
import { CellLocation } from './Location';
import { StepDescriptor } from './StepDescriptor';
import { LandResult } from './LandResult';

export class BoardState {
  public rows: number;
  public columns: number;
  public values: IFigure[][];

  constructor(rows: number, columns: number, values?: IFigure[][]) {
    this.rows = rows;
    this.columns = columns;
  }

  getFigure(location: CellLocation): IFigure {
    return this.values[location.row][location.column];
  }

  setFigure(location: CellLocation, figure: IFigure): void {
    this.values[location.row][location.column] = figure;
  }

  isLocationValid(location: CellLocation): boolean {
    return location && location.row >= 0 && location.row < this.rows &&
      location.column >= 0 && location.column < this.columns;
  }

  land(toLocation: CellLocation, fromLocation: CellLocation): LandResult {
    let landResult: LandResult;

    if (this.isLocationValid(toLocation)) {
      const figure = this.getFigure(toLocation);
      const pathDistance = fromLocation.distanceTo(toLocation);

      landResult = figure.land(pathDistance, toLocation);
      if (landResult && !landResult.exitLocation.equals(toLocation)) {
        landResult = this.land(landResult.exitLocation, fromLocation);
      }
    }

    return landResult;
  }
}
