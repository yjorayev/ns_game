import { Component, OnInit } from '@angular/core';
import { IFigure } from '../common/interfaces/IFigure.interface';
import { FigureTypes as FigureType } from '../common/enums/figureTypes.enum';
import { Location } from '../common/classes/Location';
import { Frog } from '../common/Figures/FrogFigure';
import { Obstacle } from '../common/Figures/ObstacleFigure';
import { NullFigure } from '../common/Figures/NullFigure';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private rows: number;
  private columns: number;
  public values: IFigure[][];

  constructor() {
    this.rows = 9;
    this.columns = 9;
    this.values = [];
    for (let i = 0; i < this.rows; i++) {
      this.values[i] = [];
      for (let j = 0; j < this.columns; j++) {
        const figure = this.getFigureFromSettings(i, j);
        this.setFigure(new Location(i, j), figure);
      }
    }
  }

  ngOnInit() {
  }

  public setFigure(location: Location, figure: IFigure): void {
    this.values[location.row][location.column] = figure;
  }

  private getFigureFromSettings(row: number, column: number): IFigure {
    const figure = lvlInfo.find(info => info.row === row && info.col === column);
    if (figure) {
      return this.createFigure(figure.type);
    }
    return new NullFigure();
  }

  private createFigure(type: FigureType): IFigure {
    switch (type) {
      case FigureType.FROG:
        return new Frog(false);
      case FigureType.BARRIER:
        return new Obstacle();
      default:
        return new NullFigure();
    }
  }

}

const lvlInfo = [
  {row: 1, col: 1, type: FigureType.FROG},
  {row: 3, col: 5, type: FigureType.FROG},
  {row: 6, col: 2, type: FigureType.FROG},
  {row: 9, col: 1, type: FigureType.FROG},
  {row: 5, col: 4, type: FigureType.BARRIER}
];



