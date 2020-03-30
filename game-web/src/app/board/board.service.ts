import { Injectable } from '@angular/core';
import { FigureType } from '../common/enums/figureTypes.enum';
import { Color } from '../common/enums/color.enum';
import { IFigure } from '../common/figure/IFigure.interface';
import { NullFigure } from '../common/figure/NullFigure';
import { Obstacle } from '../common/figure/ObstacleFigure';
import { CellLocation } from '../common/location/Location';
import { ICellLocation } from '../common/location/ICellLocation.interface';
import { Frog } from '../common/figure/FrogFigure';
import { Board } from '../common/board/Board';
import { Path } from '../common/path/path';

const lvlInfo = [
    { row: 1, col: 1, type: FigureType.FROG, color: Color.RED },
    { row: 3, col: 5, type: FigureType.FROG, color: Color.RED },
    { row: 3, col: 6, type: FigureType.FROG, color: Color.RED },
    { row: 6, col: 2, type: FigureType.FROG, color: Color.RED },
    { row: 8, col: 1, type: FigureType.FROG, color: Color.RED },
    { row: 5, col: 4, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 6, col: 4, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 2, col: 7, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 7, col: 0, type: FigureType.OBSTACLE, color: Color.NULL },
    { row: 0, col: 4, type: FigureType.OBSTACLE, color: Color.NULL }
];

@Injectable()
export class BoardService {
    constructor(private _board: Board) { }

    createBoard(): Board {
        this._board.setDimensions(9, 9);
        this._board.values = [];
        for (let i = 0; i < 9; i++) {
            this._board.values[i] = [];
            for (let j = 0; j < 9; j++) {
                const figure = this.getFigureFromSettings(i, j);
                this._board.setFigure(new CellLocation(i, j), figure);
            }
        }
        return this._board;
    }

    getPath(toLocation: ICellLocation): Path {
        return this._board.getPath(toLocation);
    }

    onBoardClick(location: CellLocation){
        this._board.click(location);
    }

    private getFigureFromSettings(row: number, column: number): IFigure {
        const figure = lvlInfo.find(
            info => info.row === row && info.col === column
        );
        const location = new CellLocation(row, column);
        if (figure) {
            return this.createFigure(figure.type, figure.color, location);
        }
        return new NullFigure(location);
    }

    private createFigure(type: FigureType, color: Color, location: ICellLocation): IFigure {
        switch (type) {
            case FigureType.FROG:
                return new Frog(color, location);
            case FigureType.OBSTACLE:
                return new Obstacle(color, location);
            default:
                return new NullFigure(location);
        }
    }
}