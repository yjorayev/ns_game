import { IFigure } from '../figure/IFigure.interface';
import { ICellLocation } from '../location/ICellLocation.interface';
import { LandResult } from '../classes/LandResult';
import { IBoardState } from './IBoardState.interface';
import { IdleState } from './BoardStates';
import { Injectable } from '@angular/core';
import { Path } from '../path/path';
import { MessengerService } from '../messenger.service';

@Injectable({
  providedIn: 'root'
})
export class Board {
  private _state: IBoardState = new IdleState();
  private _rowLength: number;
  private _columnLength: number;
  public values: IFigure[][];

  constructor(private _messenger: MessengerService) {
    this._messenger.onFigureActivated()
      .subscribe(figure => {
        this._state = this._state.updateState(figure)
      });

    this._messenger.onfiguresSwapped()
      .subscribe(res => {
        this.setFigure(res.figure1.currentLocation, res.figure1);
        this.setFigure(res.figure2.currentLocation, res.figure2);
        this._state = new IdleState();
      });
  };


  get currentState() {
    return this._state;
  }

  setDimensions(rows: number, columns: number) {
    this._rowLength = rows;
    this._columnLength = columns;
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

  click(location: ICellLocation) {
    const figure = this.getFigure(location);
    this._state.onClick(this._messenger, figure);
  }

  getPath(toLocation: ICellLocation): Path {
    return this._state.getPath(toLocation, this);
  }

  private getFigure(location: ICellLocation): IFigure {
    return this.values[location.row][location.column];
  }

  private isLocationValid(location: ICellLocation): boolean {
    return location.row >= 0 && location.row < this._rowLength &&
      location.column >= 0 && location.column < this._columnLength;
  }
}
