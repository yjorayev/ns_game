import { Component } from '@angular/core';
import { CellLocation } from '../common/location/Location';
import { PathService } from '../common/path/path.service';
import { BoardState } from '../common/classes/BoardState';
import { Path } from '../common/path/path';
import { BoardService } from './board.service';
import { NullLocation } from '../common/location/nullLocation';
import { ICellLocation } from '../common/location/ICellLocation.interface';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  private _currentActiveFigureLocation: ICellLocation = NullLocation.Instance;
  private _currentPath: Path;
  public boardState: BoardState;

  constructor(private _pathService: PathService, private _boardService: BoardService) {
    this.boardState = new BoardState(9, 9);
    this.boardState.values = [];
    for (let i = 0; i < this.boardState.rows; i++) {
      this.boardState.values[i] = [];
      for (let j = 0; j < this.boardState.columns; j++) {
        const figure = this._boardService.getFigureFromSettings(i, j);
        this.boardState.setFigure(new CellLocation(i, j), figure);
      }
    }
  }

  public getCellClass(row: number, column: number) {
    const classes = [];
    classes.push(this.boardState.values[row][column].color.toString());
    if (this.isInPath(row, column)) {
      classes.push('inPath');
    }
    return classes.reduce((curr, next) => curr + ' ' + next);
  }

  //#region Events
  public activateFigure(row: number, col: number): void {
    const location = new CellLocation(row, col);
    if (this._currentActiveFigureLocation.equals(location)) {
      this._currentActiveFigureLocation = NullLocation.Instance;
    } else {
      this._currentActiveFigureLocation = location;
    }
  }

  public updateCurrentPath(row: number, col: number): void {
    this._currentPath = this._pathService.getPath(this.boardState, this._currentActiveFigureLocation, new CellLocation(row, col));
  }
  //#endregion

  //#region private methods
  private isInPath(x: number, y: number): boolean {
    if (this._currentPath) {
      return this._currentPath.contains(new CellLocation(x, y));
    }
    return false;
  }
  //#endregion
}




