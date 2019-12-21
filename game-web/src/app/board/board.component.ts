import { Component, OnInit } from '@angular/core';
import { CellLocation } from '../common/classes/Location';
import { BoardService } from './board.service';
import { BoardState } from '../common/classes/BoardState';
import { Path } from '../common/classes/Path';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private currentActiveFigureLocation: CellLocation;
  private currentPath: Path;
  public boardState: BoardState;

  constructor(private boardService: BoardService) {
    this.boardState = new BoardState(9, 9);
    this.boardState.values = [];
    for (let i = 0; i < this.boardState.rows; i++) {
      this.boardState.values[i] = [];
      for (let j = 0; j < this.boardState.columns; j++) {
        const figure = this.boardService.getFigureFromSettings(i, j);
        this.boardState.setFigure(new CellLocation(i, j), figure);
      }
    }
  }

  ngOnInit() {
  }

  public getClass(row: number, column: number) {
    let classValue = this.boardState.values[row][column].color.toString();
    if (this.isInPath(row, column)) {
      classValue += ' inPath';
    }
    return classValue;
  }

  public activateFigure(row: number, col: number): void {
    const location = new CellLocation(row, col);
    if (this.currentActiveFigureLocation && this.currentActiveFigureLocation.equals(location)) {
      this.currentActiveFigureLocation = null;
    } else {
      this.currentActiveFigureLocation = location;
    }
  }

  public getPathTo(row: number, col: number): void {
    if (this.currentActiveFigureLocation) {
      this.currentPath = this.boardService.getPath(this.boardState, this.currentActiveFigureLocation, new CellLocation(row, col));
      console.log(row, col);
    } else {
      this.currentPath = null;
    }
  }

  public isInPath(x: number, y: number): boolean {
    if (this.currentPath) {
      return this.currentPath.contains(new CellLocation(x, y));
    }
    return false;
  }
}




