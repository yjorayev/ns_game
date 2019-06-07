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

  public activateFigure(row: number, col: number): void {
    if (!this.currentActiveFigureLocation) {
      this.currentActiveFigureLocation = new CellLocation(row, col);
    } else {

    }
  }

  public getPathTo(row: number, col: number): void {
    if (this.currentActiveFigureLocation) {
      const path = this.boardService.getPath(this.boardState, this.currentActiveFigureLocation, new CellLocation(row, col));
      console.log(row, col);
      this.drawPath(path);
    }
  }

  private drawPath(path: Path): void{

  }
}




