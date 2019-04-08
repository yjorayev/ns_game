import { Component, OnInit } from '@angular/core';
import { Location } from '../common/classes/Location';
import { BoardService } from './board.service';
import { BoardState } from '../common/classes/BoardState';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private currentActiveFigureLocation: Location;
  public boardState: BoardState;

  constructor(private boardService: BoardService) {
    this.boardState = new BoardState(9, 9);
    this.boardState.values = [];
    for (let i = 0; i < this.boardState.rows; i++) {
      this.boardState.values[i] = [];
      for (let j = 0; j < this.boardState.columns; j++) {
        const figure = this.boardService.getFigureFromSettings(i, j);
        this.boardState.setFigure(new Location(i, j), figure);
      }
    }
  }

  ngOnInit() {
  }

  public activateFigure(row: number, col: number): void {
    if (this.currentActiveFigureLocation === null) {
      this.currentActiveFigureLocation = new Location(row, col);
    } else {

    }
  }

  public getPathTo(row: number, col: number): void {
    if (this.currentActiveFigureLocation !== null) {
      const path = this.boardService.getPath(this.boardState, this.currentActiveFigureLocation, new Location(row, col));
    }
  }
}




