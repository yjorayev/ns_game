import { Component } from '@angular/core';
import { CellLocation } from '../common/location/Location';
import { Path } from '../common/path/path';
import { BoardService } from './game.service';
import { Board } from '../common/board/Board';
@Component({
  selector: 'app-board',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  private _currentPath: Path;
  public board: Board;

  constructor(private _boardService: BoardService) {
    this.board = this._boardService.createBoard();
  }

  public getCellClass(row: number, column: number) {
    const classes = [];
    classes.push(this.board.values[row][column].color.toString());
    if (this.isInPath(row, column)) {
      classes.push('inPath');
    }
    return classes.reduce((curr, next) => curr + ' ' + next);
  }

  //#region Events
  public activateFigure(row: number, col: number): void {
    const location = new CellLocation(row, col);
    this._boardService.onBoardClick(location);
  }

  public updateCurrentPath(row: number, col: number): void {
    this._currentPath = this._boardService.getPath(new CellLocation(row, col));
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